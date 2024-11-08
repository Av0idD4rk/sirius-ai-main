import random

from django.db.models import Count

from rest_framework import generics, status
from rest_framework.decorators import permission_classes
from rest_framework.response import Response

from rest_framework_simplejwt.tokens import AccessToken

from authen.models import User, UserThread
from backend_library import settings
from .models import Book, Favorite, Like, Rating
from .serializers import BookSerializer, FavoriteSerializer, LikeSerializer, RatingSerializer, BookMiniSerializer
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from django.http import FileResponse, StreamingHttpResponse
from django.shortcuts import get_object_or_404

from openai import OpenAI
import json

client = OpenAI(api_key=settings.OPENAI_API_KEY)


@permission_classes([IsAuthenticated])
class BookCreateView(generics.CreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer


@permission_classes([IsAuthenticatedOrReadOnly])
class BookListView(generics.ListAPIView):
    queryset = Book.objects.all()
    serializer_class = BookMiniSerializer


@permission_classes([IsAuthenticatedOrReadOnly])
class BookDetailView(generics.RetrieveAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer


@permission_classes([IsAuthenticated])
class ReadBookOnlineView(generics.GenericAPIView):

    def get(self, request, pk):
        book = get_object_or_404(Book, pk=pk)
        if not book.file:
            return Response({"error": "Book file not found"}, status=status.HTTP_404_NOT_FOUND)

        return Response(book.file.url, status=status.HTTP_200_OK)


@permission_classes([IsAuthenticated])
class LikeBookView(generics.GenericAPIView):
    serializer_class = LikeSerializer

    def post(self, request, pk):
        book = Book.objects.get(pk=pk)
        like, created = Like.objects.get_or_create(user=request.user, book=book)
        if not created:
            like.delete()
            book.likes_count -= 1
            book.save()
            return Response({"message": "Like removed"}, status=status.HTTP_200_OK)
        else:
            book.likes_count += 1
            book.save()
            return Response({"message": "Book liked"}, status=status.HTTP_201_CREATED)


@permission_classes([IsAuthenticated])
class FavoriteBookView(generics.GenericAPIView):
    serializer_class = FavoriteSerializer

    def post(self, request, pk):
        book = Book.objects.get(pk=pk)
        favorite, created = Favorite.objects.get_or_create(user=request.user, book=book)
        if not created:
            favorite.delete()
            return Response({"message": "Book removed from favorites"}, status=status.HTTP_200_OK)
        return Response({"message": "Book added to favorites"}, status=status.HTTP_201_CREATED)
    def get(self, request, pk):
        return Response({"is_favorite":Favorite.objects.filter(user=request.user, book=pk).exists()})

@permission_classes([IsAuthenticated])
class FavoriteListView(generics.ListAPIView):
    serializer_class = BookMiniSerializer

    def get_queryset(self):
        user = self.request.user
        favorites = Favorite.objects.filter(user=user)
        return Book.objects.filter(id__in=[favorite.book.id for favorite in favorites])


@permission_classes([IsAuthenticated])
class RateBookView(generics.GenericAPIView):
    serializer_class = RatingSerializer

    def post(self, request, pk):
        book = Book.objects.get(pk=pk)
        rating_value = request.data.get('rating')
        if not (1 <= int(rating_value) <= 5):
            return Response({"error": "Rating must be between 1 and 5"}, status=status.HTTP_400_BAD_REQUEST)

        rating, created = Rating.objects.update_or_create(
            user=request.user, book=book,
            defaults={'rating': rating_value}
        )
        book.update_average_rating()
        return Response({"message": "Rating submitted", "rating": rating_value}, status=status.HTTP_200_OK)


@permission_classes([IsAuthenticated])
class BookRecommendationView(generics.ListAPIView):
    serializer_class = BookSerializer

    def get_queryset(self):
        liked_books = Like.objects.filter(user=self.request.user).values_list('book', flat=True)
        similar_users = Like.objects.filter(book__in=liked_books).exclude(user=self.request.user).values_list('user',
                                                                                                              flat=True)
        recommended_books = Like.objects.filter(user__in=similar_users).exclude(book__in=liked_books).values(
            'book').annotate(total_likes=Count('book')).order_by('-total_likes')

        book_ids = [book['book'] for book in recommended_books]
        return Book.objects.filter(id__in=book_ids)


class ThreadView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        book_id = request.data.get("book_id")
        book = Book.objects.get(id=book_id)
        user = request.user
        if not user.threads.filter(id=book_id).exists():
            thread = client.beta.threads.create()
            thread_id = thread.id
            userthread = UserThread.objects.create(
                user=user,
                book=book,
                thread_id=thread_id
            )
            userthread.save()

            return Response({"thread_id": userthread.thread_id}, status=status.HTTP_201_CREATED)
        else:
            userthread = UserThread.objects.filter(user_id=user.user_id).get(book_id=book.id)
            return Response({"thread_id": userthread.thread_id}, status=status.HTTP_201_CREATED)


class MessageView(generics.GenericAPIView):
    permission_classes=[IsAuthenticated]
    def post(self, request, thread_id):
        assistant_id = UserThread.objects.get(thread_id=thread_id).book.assistant_id
        message_content = request.data.get("content")
        message = client.beta.threads.messages.create(
            thread_id=thread_id,
            role="user",
            content=message_content
        )

        def stream_response(thread_id, assistant_id):
            with client.beta.threads.runs.stream(
                    thread_id=thread_id,
                    assistant_id=assistant_id
            ) as stream:
                for event in stream:
                    if event.event == 'thread.message.delta':
                        yield f'{event.data.delta.content[0].text.value}'

        return StreamingHttpResponse(stream_response(thread_id, assistant_id), content_type='text/event-stream')


    def get(self, request, thread_id):
        messages = client.beta.threads.messages.list(
            thread_id=thread_id
        )
        origin_messages = json.loads(messages.model_dump_json())
        modified_messages= [
            {
                "id": item["id"],
                "role": item["role"],
                "text": item["content"][0]["text"]["value"]
            }
            for item in origin_messages['data']
        ]
        return Response({"data": modified_messages}, status=status.HTTP_200_OK)


class SummarizeView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, book_id):
        book = Book.objects.get(id=book_id)

        def stream_response(assistant_id):
            with client.beta.threads.create_and_run_stream(
                    assistant_id=assistant_id,
                    thread={
                        "messages": [
                            {"role": "user",
                             "content": f"Создай краткое содержание книги ‘{book.title}' от {book.author}. Опиши основные события, ключевые идеи и развитие сюжета, включая важные детали, но избегай излишней детализации. Содержание должно быть написано ясным и доступным языком, чтобы передать основную мысль и главные моменты книги. Если нужно, разбей содержание по ключевым частям или главам. Длина описания — от 3 до 5 абзацев (или другое необходимое количество), чтобы обеспечить емкость и полезность для читателя."}
                        ]
                    }
            ) as stream:
                for event in stream:
                    if event.event == 'thread.message.delta':
                        yield f'{event.data.delta.content[0].text.value}'

        return StreamingHttpResponse(stream_response(book.assistant_id), content_type='text/event-stream')


class GetRunStatusView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, run_id, thread_id):
        run = client.beta.threads.runs.retrieve(run_id=run_id, thread_id=thread_id)
        return Response({"status": run.status}, status=status.HTTP_200_OK)


class GenerateTestsView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, book_id):
        book = Book.objects.get(id=book_id)

        response = client.beta.threads.create_and_run_poll(
                    assistant_id=book.assistant_id,
                    thread={
                        "messages": [
                            {"role": "user",
                             "content": f"Составь тест из {random.randint(7, 10)} вопросов по книге ‘{book.title} от {book.author}’ в формате JSON. Каждый элемент должен содержать: 1. text: текст вопроса 2. options: массив из четырех вариантов ответа в формате text: string, isCorrect: Boolean. 3.explanation: краткое объяснение, почему ответ правильный. Тесты должны быть связаны с ключевыми событиями, персонажами, идеями или цитатами из книги, которые важно знать читателю. В ответ дай только JSON строку без ничего лишнего, без комментариев и без тегов начала кода"}
                        ]
                    }
            )
        messages = client.beta.threads.messages.list(thread_id=response.thread_id)
        origin_messages = json.loads(messages.model_dump_json())
        modified_messages= [
            {
                "id": item["id"],
                "role": item["role"],
                "text": item["content"][0]["text"]["value"].lstrip('```json').rstrip('```')
            }
            for item in origin_messages['data']
        ]
        print(modified_messages)
        return Response({"data":modified_messages[0]['text']}, status=status.HTTP_200_OK)

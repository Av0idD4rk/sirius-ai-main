from django.urls import path
from .views import BookCreateView, BookListView, BookDetailView, LikeBookView, \
    FavoriteBookView, FavoriteListView, RateBookView, BookRecommendationView, ReadBookOnlineView, ThreadView, \
    MessageView, SummarizeView, GenerateTestsView, GetRunStatusView

urlpatterns = [


    path('books/', BookListView.as_view(), name='book_list'),
    path('books/create/', BookCreateView.as_view(), name='create_book'),
    path('books/<int:pk>/', BookDetailView.as_view(), name='book_detail'),
    path('books/<int:pk>/read/', ReadBookOnlineView.as_view(), name='book_read'),
    path('books/<int:pk>/like/', LikeBookView.as_view(), name='like_book'),
    path('books/<int:pk>/favorite/', FavoriteBookView.as_view(), name='favorite_book'),
    path('books/<int:pk>/rate/', RateBookView.as_view(), name='rate_book'),
    path('books/recommendations/', BookRecommendationView.as_view(), name='book_recommendations'),

    path('books/favorites/', FavoriteListView.as_view(), name='favorites_list'),

    path('ai/threads/', ThreadView.as_view(), name='ai_threads'),
    path('ai/threads/runs/<str:run_id>/<str:thread_id>/', GetRunStatusView.as_view(), name='get_run_status'),
    path('ai/threads/<str:thread_id>/messages/', MessageView.as_view(), name='ai_messages'),
    path('ai/books/<str:book_id>/summarize/', SummarizeView.as_view(), name='book_summarize'),
    path('ai/books/<str:book_id>/test/', GenerateTestsView.as_view(), name='generate_tests'),


]

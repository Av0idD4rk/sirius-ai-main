from rest_framework import serializers
from .models import Book, Like, Favorite, Rating



class BookSerializer(serializers.ModelSerializer):
    likes_count = serializers.ReadOnlyField()
    categories = serializers.SerializerMethodField('get_categories')

    def get_categories(self, obj):
        return [category.name for category in obj.categories.all()]

    class Meta:
        model = Book
        fields = ['id', 'cover_image','title', 'author', 'description', 'published_date', 'isbn', 'language', 'categories', 'file',
                  'added_by', 'created_at', 'updated_at', 'likes_count','average_rating','assistant_id']

class BookMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id','title','author','cover_image']

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ['id', 'user', 'book', 'created_at']


# Сериализатор для избранного
class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite
        fields = ['id', 'user', 'book', 'created_at']


# Сериализатор для рейтингов
class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ['id', 'user', 'book', 'rating', 'created_at', 'updated_at']

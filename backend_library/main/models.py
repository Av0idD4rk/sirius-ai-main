import uuid
from django.utils import timezone

from django.db import models
from django.contrib.auth.models import AbstractBaseUser

from backend_library import settings


class Category(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name


class Book(models.Model):
    title = models.CharField(max_length=80)
    author = models.CharField(max_length=80)
    description = models.TextField(blank=True)
    published_date = models.DateField(null=True, blank=True)
    isbn = models.CharField(max_length=13, unique=True, null=True, blank=True)
    cover_image = models.ImageField(upload_to='book_covers/', null=True, blank=True)
    language = models.CharField(max_length=50, default='Russian')
    categories = models.ManyToManyField(Category, related_name='books')
    file = models.FileField(upload_to='books/', null=True, blank=True)
    assistant_id = models.CharField(max_length=255, blank=True, null=True)  # id ассистента для openai
    added_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='added_books', default=None
    )
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    likes_count = models.PositiveIntegerField(default=0)

    average_rating = models.FloatField(default=0.0)

    def update_average_rating(self):
        ratings = self.ratings.all()  # Получаем все рейтинги для книги
        if ratings.exists():
            self.average_rating = sum(rating.rating for rating in ratings) / ratings.count()
        else:
            self.average_rating = 0
        self.save()

    def __str__(self):
        return self.title




class Streak(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE
    )
    streak_number = models.IntegerField(default=0)


class Like(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'book')

    def __str__(self):
        return f"{self.user.username} liked {self.book.title}"


class Favorite(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'book')

    def __str__(self):
        return f"{self.user.username} favorited {self.book.title}"


class Rating(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='ratings')
    rating = models.PositiveIntegerField()  # Рейтинг от 1 до 5
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user', 'book')

    def __str__(self):
        return f"{self.user.username} rated {self.book.title} with {self.rating}"





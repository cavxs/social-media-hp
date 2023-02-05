from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    following = models.ManyToManyField('self', related_name="followers", symmetrical=False)

    def __str__(self):
        return self.username


class Post(models.Model):
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")
    created_at = models.DateTimeField(auto_now_add=True)
    body = models.CharField(max_length=280)
    likes = models.IntegerField()

    def __str__(self):
        return f"Post by {self.creator} at {self.created_at}"

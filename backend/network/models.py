from django.contrib.auth.models import AbstractUser
from django.db import models



class User(AbstractUser):
    username = models.CharField(max_length=10, unique=True)
    following = models.ManyToManyField('self', blank=True, null=True, related_name="followers", symmetrical=False)
    profile_picture = models.ImageField(upload_to='profile_pictures', null=True, blank=True)
    def __str__(self):
        return self.username

# class UserProfile(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")

class Post(models.Model):
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")
    created_at = models.DateTimeField(auto_now_add=True)
    body = models.CharField(max_length=280)
    likes = models.ManyToManyField(User, blank=True, null=True, related_name="liked")

    def __str__(self):
        return f"Post by {self.creator} at {self.created_at}"

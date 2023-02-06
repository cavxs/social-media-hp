from rest_framework import serializers
from .models import Post, User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email']


class PostSerializer(serializers.ModelSerializer):
    creator = UserSerializer()
    class Meta:
        model = Post
        fields = ['id', 'creator', 'body', 'likes', 'created_at']
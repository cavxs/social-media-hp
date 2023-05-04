from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.settings import api_settings
from django.contrib.auth.models import update_last_login
from django.core.exceptions import ObjectDoesNotExist

from .models import Post, User


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create(username=validated_data['username'], first_name=validated_data['first_name'], last_name=validated_data["last_name"])
        user.set_password(validated_data['password'])
        user.save()
        return user

class FollowingSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields=['username']

# class Fo(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields=['username']

class ProfilePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['body', 'likes', 'created_at']

class UserPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username', 'first_name', 'profile_picture']

class UserSerializer(serializers.ModelSerializer):
    following = FollowingSerializer(many=True)
    posts_count = serializers.SerializerMethodField()
    followers_count = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'following', 'followers_count', 'posts_count', 'profile_picture']

    def get_followers_count(self, obj):
        return obj.followers.count()
    
    def get_posts_count(self, obj):
        return obj.posts.count()
    

    def to_representation(self, obj):
        data = super().to_representation(obj)

        req = self.context.get('request')
        following = self.context.get('following')
        if req:
            if following:
                data['is_following'] = req.user.following.filter(id=obj.id).exists()
    
        return data

# class UserProfileSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = UserProfile
#         fields = ['user', 'profile_picture']



class PostSerializer(serializers.ModelSerializer):
    creator = UserPostSerializer(read_only=True)
    like_count = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'creator', 'body', 'like_count', 'is_liked', 'created_at']
        read_only_fields = ['creator', 'created_at', 'like_count', ]

    def get_like_count(self, obj):
        return obj.likes.count()

    def get_is_liked(self, obj):
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            return request.user in obj.likes.all()
        return False
    
    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['creator'] = user
        return super().create(validated_data)
    


    # def



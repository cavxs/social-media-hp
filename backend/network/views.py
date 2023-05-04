from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from rest_framework.response import Response
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.urls import reverse

import json

from .models import User, Post
from .serializers import PostSerializer

def index(request):
    return render(request, "network/index.html", {
        "posts": Post.objects.all()
    })

@login_required
def newpost(req):
    # make a new post
    if (req.method == "POST"):
        postData = json.loads(req.body)
        newPost = Post(creator=req.user, body=postData["post_txt"], likes=0)
        newPost.save()
        serializer = PostSerializer(newPost)
        return JsonResponse({"post": serializer.data});


def get_following_posts(req):
    if (req.method == "GET"):
        # posts = Post.objects.select_related('creator').values("body", "created_at", "likes", "creator__username")
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        # return JsonResponse({"posts": list(posts)})
        return JsonResponse({"posts": serializer.data})



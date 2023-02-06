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

def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")

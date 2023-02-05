
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("following", views.get_following_posts, name="following"),
    path("posts", views.get_all_posts, name="get_posts"),
    path("newpost", views.newpost, name="newpost")
]


from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from . import views
from . import viewsets
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)


from rest_framework import routers
router = routers.DefaultRouter()
router.register(r'register', viewsets.RegistrationViewSet, basename='register')
router.register(r'post', viewsets.PostViewSet, basename='post')
router.register(r'user', viewsets.UserViewSet, basename='user')
# router.register(r'userprofile', viewsets.UserProfileViewSet, basename='userprofile')

urlpatterns = [
    path("", views.index, name="index"),
    # path("login", views.login_view, name="login"),
    # path("logout", views.logout_view, name="logout"),
    path("api/", include(router.urls)),
    # path("following", views.get_following_posts, name="following"),
    # path("newpost", views.newpost, name="newpost"),
    path('api/user/<str:username>', viewsets.UserViewSet.as_view({'get': 'retrieve'}), name='user-detail'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify', TokenVerifyView.as_view(), name='token_verify'),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
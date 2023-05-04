# core/auth/viewsets
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.viewsets import ReadOnlyModelViewSet, ModelViewSet
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework import filters
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer, PostSerializer, UserSerializer
from .models import User, Post
from .pagination import PostPagination
from rest_framework.parsers import MultiPartParser, FormParser


class RegistrationViewSet(ModelViewSet, TokenObtainPairView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny,]
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        res = {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }

        return Response({
            "user": serializer.data,
            "refresh": res["refresh"],
            "token": res["access"]
        }, status=status.HTTP_201_CREATED)


class UserViewSet(ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)
    queryset = User.objects.all()
    http_method_names = ['get', 'put']

    def list(self, request):
        username = request.query_params.get("username")
        if username:
            queryset = self.get_queryset().get(username=username)
            serializer = self.get_serializer(queryset, context={"request": request, "following":True})
        else:
            serializer = self.get_serializer(self.get_queryset(), many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, *args, **kwargs):
        username = kwargs.get('username')
        if username:
            # user = User.objects.get(username=username)

            serializer = UserSerializer(request.user)
            return Response(serializer.data)
        return super().retrieve(request, *args, **kwargs)
    

    # @action(detali=False, methods=['get'], url_path="/(?P<username>\w+)")
    # def username(self, request, username):
    #     print("")
    
    @action(detail=False, methods=['put'])
    def pfp(self, request):
        pfp = self.request.FILES['pfp']
        if pfp:
            print(request.user)
            user = User.objects.get(username=request.user)
            user.profile_picture = pfp
            user.save()
            serializer = self.get_serializer(user)
            return Response(serializer.data, status=200)
        
    
    @action(detail=False, methods=['put'])
    def relation(self, request):
        to_follow = request.data.get('username')

        requester_following = request.user.following.filter(username=to_follow)
        user_to_follow = self.get_queryset().get(username=to_follow)
        
        if requester_following.exists():
            request.user.following.remove(user_to_follow)
        else:
            request.user.following.add(user_to_follow)
        
        request.user.save()

        serializer = self.get_serializer(user_to_follow, context={"request":request, "following":True})
        return Response(serializer.data, status=200)


    


    
# class UserProfileViewSet(ModelViewSet):
#     queryset = UserProfile.objects.all()
#     permission_classes = (AllowAny,)
#     serializer_class = UserProfileSerializer
#     http_method_names =['get', 'patch']
#     parser_classes = (FormParser, MultiPartParser)

#     def perform_update(self, serializer):
#         pfp = self.request.FILES['pfp']
#         serializer.save(profile_picture=pfp)

class PostViewSet(ModelViewSet):
    serializer_class = PostSerializer
    permission_classes = (AllowAny,)
    queryset = Post.objects.all().order_by('-created_at')
    pagination_class = PostPagination
    http_method_names = ['get', 'post', 'put']

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context

    def list(self, req):
        following = req.query_params.get("following")
        user = req.query_params.get("user")
        likes = req.query_params.get("likes")
        queryset = self.get_queryset()
        if following is not None:
            print("he want the posts of his following")
            user_following = req.user.following.all()
            queryset = queryset.filter(creator__in=user_following)

        if user is not None:
            if likes is not None:
                u_obj = User.objects.get(username=user)
                liked_posts = u_obj.liked.all()
                queryset = queryset.filter(pk__in=liked_posts)
            else:
                queryset = queryset.filter(creator__username=user)
        
        page = self.paginate_queryset(queryset)
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)
    
    def update(self, req, *args, **kwargs):
        instance = self.get_object()
        if instance.creator != req.user:
            return Response({'message': 'You are not the owner of this post'})
        else:
            return super().update(req, *args, **kwargs)
        
    @action(detail=True, methods=['post'])
    def like(self, req, pk=None):
        post = self.get_object()
        if req.user not in post.likes.all():
            post.likes.add(req.user)
            post.save()
            serializer = self.get_serializer(post)
            return Response(serializer.data)
        return Response({"message": "You can't like more than once"})


    @action(detail=True, methods=['post'])
    def unlike(self, req, pk=None):
        post = self.get_object()
        if req.user in post.likes.all():
            post.likes.remove(req.user)
            post.save()
            serializer = self.get_serializer(post)
            return Response(serializer.data)
        return Response({"message": "You can't unlike more than once"})

    
    def create(self, req):
        serializer = self.get_serializer(data=req.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(creator=req.user)
        return Response(serializer.data, status=200)

    # def update(self, request, *args, **kwargs):
    #     print(request)
    #     return super().update(request, *args, **kwargs)
    # def get_queryset(self):
    #     return Post.objects.filer(creator=self.request.user)
    
    # def perform_create(self, serializer):
    #     serializer.save()

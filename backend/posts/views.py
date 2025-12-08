from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from .models import Post
from .serializers import PostSerializer, PostStatusUpdateSerializer
from .permissions import IsPostAuthor, IsAdmin
from users.permissions import IsAdmin as IsAdminUser

# Author APIs
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_post(request):
    serializer = PostSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(author=request.user, status='PENDING')
        return Response({
            'message': 'Post created and pending approval',
            'post': {
                'id': serializer.data['id'],
                'title': serializer.data['title'],
                'status': serializer.data['status']
            }
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated, IsPostAuthor])
def update_post(request, postId):
    try:
        post = Post.objects.get(id=postId)
    except Post.DoesNotExist:
        return Response({
            'message': 'Post not found'
        }, status=status.HTTP_404_NOT_FOUND)
    
    serializer = PostSerializer(post, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save(status='PENDING')  # Reset to pending after edit
        return Response({
            'message': 'Post updated successfully',
            'post': {
                'id': serializer.data['id'],
                'title': serializer.data['title'],
                'status': serializer.data['status']
            }
        }, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated, IsPostAuthor])
def delete_post(request, postId):
    try:
        post = Post.objects.get(id=postId)
        post.delete()
        return Response({
            'message': 'Your post has been deleted'
        }, status=status.HTTP_200_OK)
    except Post.DoesNotExist:
        return Response({
            'message': 'Post not found'
        }, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_posts(request):
    posts = Post.objects.filter(author=request.user).order_by('-created_at')
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_post(request, postId):
    try:
        post = Post.objects.get(id=postId)
        serializer = PostSerializer(post)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Post.DoesNotExist:
        return Response({
            'message': 'Post not found'
        }, status=status.HTTP_404_NOT_FOUND)

# Admin APIs
@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminUser])
def get_all_users(request):
    from users.models import User
    from users.serializers import UserSerializer
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['PUT'])
@permission_classes([IsAuthenticated, IsAdminUser])
def update_user_role(request, id):
    from users.models import User
    from users.serializers import UserRoleUpdateSerializer
    try:
        user = User.objects.get(id=id)
    except User.DoesNotExist:
        return Response({
            'message': 'User not found'
        }, status=status.HTTP_404_NOT_FOUND)
    
    serializer = UserRoleUpdateSerializer(user, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'message': 'Role updated successfully',
            'userId': user.id,
            'newRole': serializer.data['role']
        }, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminUser])
def pending_posts(request):
    posts = Post.objects.filter(status='PENDING').order_by('-created_at')
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['PUT'])
@permission_classes([IsAuthenticated, IsAdminUser])
def update_post_status(request, postId):
    try:
        post = Post.objects.get(id=postId)
    except Post.DoesNotExist:
        return Response({
            'message': 'Post not found'
        }, status=status.HTTP_404_NOT_FOUND)
    
    serializer = PostStatusUpdateSerializer(post, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({
            'message': 'Post status updated',
            'postId': post.id,
            'status': serializer.data['status']
        }, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated, IsAdminUser])
def admin_delete_post(request, postId):
    try:
        post = Post.objects.get(id=postId)
        post.delete()
        return Response({
            'message': 'Post deleted successfully'
        }, status=status.HTTP_200_OK)
    except Post.DoesNotExist:
        return Response({
            'message': 'Post not found'
        }, status=status.HTTP_404_NOT_FOUND)

# Public APIs
@api_view(['GET'])
@permission_classes([AllowAny])
def public_posts(request):
    posts = Post.objects.filter(status='APPROVED').order_by('-created_at')
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([AllowAny])
def public_post_detail(request, postId):
    try:
        post = Post.objects.get(id=postId, status='APPROVED')
        serializer = PostSerializer(post)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Post.DoesNotExist:
        return Response({
            'message': 'Post not found or not approved'
        }, status=status.HTTP_404_NOT_FOUND)



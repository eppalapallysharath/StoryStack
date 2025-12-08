from django.urls import path
from . import views

urlpatterns = [
    path('posts/', views.public_posts, name='public_posts'),
    path('posts/<int:postId>/', views.public_post_detail, name='public_post_detail'),
]



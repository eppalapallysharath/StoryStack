from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.get_all_users, name='get_all_users'),
    path('users/<int:id>/role/', views.update_user_role, name='update_user_role'),
    path('posts/pending/', views.pending_posts, name='pending_posts'),
    path('posts/<int:postId>/status/', views.update_post_status, name='update_post_status'),
    path('posts/<int:postId>/', views.admin_delete_post, name='admin_delete_post'),
]



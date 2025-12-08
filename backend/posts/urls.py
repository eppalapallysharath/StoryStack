from django.urls import path
from . import views

urlpatterns = [
    path('', views.create_post, name='create_post'),
    path('my-posts/', views.my_posts, name='my_posts'),
    path('<int:postId>/', views.get_post, name='get_post'),
    path('<int:postId>/update/', views.update_post, name='update_post'),
    path('<int:postId>/delete/', views.delete_post, name='delete_post'),
]



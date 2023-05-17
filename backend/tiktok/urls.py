from django.urls import path
from . import views
from django.conf.urls.static import static

urlpatterns = [
    # Tag URLs
    path('tags/', views.tag_list, name='tag-list'),
    path('tags/<int:pk>/', views.tag_detail, name='tag-detail'),

    # Link URLs
    path('links/', views.link_list, name='link-list'),
    path('links/<int:pk>/', views.link_detail, name='link-detail'),

    # User URLs
    path('users/', views.user_list, name='user-list'),
    path('users/<int:pk>/', views.user_detail, name='user-detail'),

    # Movie URLs
    path('movies/', views.movie_list, name='movie-list'),
    path('movies/<int:pk>/', views.movie_detail, name='movie-detail'),

    #Login
    path('signin/', views.signin_view, name='signin'),
    path('signup/', views.signup_view, name='signup'),
    path('signout/', views.signout_view, name='logout'),

    # Movie by tags
    path('movies-by-tag/', views.movies_by_tag, name='movies-by-tag'),
    path('movie-list-hearted/',views.movie_list_hearted, name='movie-list-hearted'),
    path('movie-list-datetime/', views.movie_list_datetime, name='movie-list-datetime'),
    path('heart_movie/', views.heart_movie, name='heart_movie'),

] 

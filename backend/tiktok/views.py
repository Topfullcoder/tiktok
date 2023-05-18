import json
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from rest_framework.decorators import api_view
from rest_framework import status
from datetime import timedelta, datetime
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.db.models import Q
from django.views.decorators.csrf import csrf_protect

from .models import User, Tag, Link, Movie
from .serializers import UserSerializer, TagSerializer, LinkSerializer, MovieSerializer

####admin
@csrf_exempt
@api_view(['GET', 'POST'])
def tag_list(request):
    if request.method == 'GET':
        tags = Tag.objects.all()
        serializer = TagSerializer(tags, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        serializer = TagSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['GET', 'PUT', 'DELETE'])
def tag_detail(request, pk):
    try:
        tag = Tag.objects.get(pk=pk)
    except Tag.DoesNotExist:
        return JsonResponse({'message': 'Tag does not exist'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = TagSerializer(tag)
        return JsonResponse(serializer.data)
    elif request.method == 'PUT':
        serializer = TagSerializer(tag, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        tag.delete()
        return JsonResponse({'message': 'Tag deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


@csrf_exempt
@api_view(['GET', 'POST'])
def link_list(request):
    if request.method == 'GET':
        links = Link.objects.all()
        serializer = LinkSerializer(links, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        serializer = LinkSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['GET', 'PUT', 'DELETE'])
def link_detail(request, pk):
    try:
        link = Link.objects.get(pk=pk)
    except Link.DoesNotExist:
        return JsonResponse({'message': 'Link does not exist'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = LinkSerializer(link)
        return JsonResponse(serializer.data)
    elif request.method == 'PUT':
        serializer = LinkSerializer(link, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        link.delete()
        return JsonResponse({'message': 'Link deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


@csrf_exempt
@api_view(['GET', 'POST'])
def user_list(request):
    if request.method == 'GET':
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['GET', 'PUT', 'DELETE'])
def user_detail(request, pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        return JsonResponse({'message': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UserSerializer(user)
        return JsonResponse(serializer.data)
    elif request.method == 'PUT':
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        user.delete()
        return JsonResponse({'message': 'User deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


@csrf_exempt
@api_view(['GET', 'POST'])
def movie_list(request):
    if request.method == 'GET':
        movies = Movie.objects.all().order_by('-createdtime')
        serializer = MovieSerializer(movies, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        serializer = MovieSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['GET', 'PUT', 'DELETE'])
def movie_detail(request, pk):
    try:
        movie = Movie.objects.get(pk=pk)
    except Movie.DoesNotExist:
        return JsonResponse({'message': 'Movie does not exist'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = MovieSerializer(movie)
        return JsonResponse(serializer.data)
    elif request.method == 'PUT':
        serializer = MovieSerializer(movie, data=request.data)
        if serializer.is_valid():
            serializer.save()

            movie.hearts += 1
            movie.save()

            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        movie.delete()
        return JsonResponse({'message': 'Movie deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


###user
@api_view(['GET'])
def movies_by_tag(request):
    tagname = request.GET.get('tagname', None)
    if tagname is not None:
        try:
            tag = Tag.objects.get(tagname=tagname)
            movies = tag.movie_set.all()
            serializer = MovieSerializer(movies, many=True)
            return JsonResponse(serializer.data)
        except Tag.DoesNotExist:
            return JsonResponse({'message': 'Tag does not exist'}, status=status.HTTP_404_NOT_FOUND)
    else:
        return JsonResponse({'message': 'tagname parameter is missing'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def movie_list_hearted(request):
    if request.method == 'GET':
        movies = Movie.objects.all().order_by('-hearts')
        serializer = MovieSerializer(movies, many=True)
        return JsonResponse(serializer.data, safe=False)

@csrf_exempt
@api_view(['GET'])
def movie_list_datetime(request):
    if request.method == 'GET':
        # Calculate the datetime threshold for the last 24 hours
        threshold = datetime.now() - timedelta(hours=24)
        # Filter movies created within the last 24 hours and order by hearts in descending order
        movies = Movie.objects.filter(createdtime__gte=threshold).order_by('-hearts')
        serializer = MovieSerializer(movies, many=True)
        return JsonResponse(serializer.data, safe=False)

@csrf_protect
@api_view(['POST'])
def signup_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        # Create new user
        user = User.objects.create(
            username=username,
            email=email,
            password=password
        )

        user.save()
        print(user.id)
        if user is not None:
            return JsonResponse({'message': 'Signup successful'})
        else:
            return JsonResponse({'message': 'Error occurred during signup'}, status=500)

@csrf_protect
@api_view(['POST'])
def signin_view(request):
    if request.method == 'POST':
        data = request.data
        username_or_email = data.get('usernameOrEmail')
        password = data.get('inPassword')
        user = User.objects.filter(username=username_or_email).first()

        print(username_or_email)
        if user is not None:
            print("asffsd")
            # user = authenticate(request, username=user.username, password=user.password)
            login(request, user)
            # if user is not None:
            #     return JsonResponse({'message': 'Signin successful'})
            # else:
            #     return JsonResponse({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return JsonResponse({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)        
@csrf_protect
@api_view(['POST'])
def signout_view(request):
    print(request.body)
    if request.method == 'POST':
        logout(request)
        return JsonResponse({'message': 'Logout successful'})

@csrf_exempt
@api_view(['POST'])
def heart_movie(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user_id = data.get('user_id')
        movie_id = data.get('movie_id')

        try:
            user = User.objects.get(pk=user_id)
            movie = Movie.objects.get(pk=movie_id)
            user.hearts.add(movie)
            return JsonResponse({'message': 'Movie hearted successfully'})
        except (User.DoesNotExist, Movie.DoesNotExist):
            return JsonResponse({'message': 'User or Movie does not exist'}, status=status.HTTP_404_NOT_FOUND)


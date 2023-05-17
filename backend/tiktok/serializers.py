from rest_framework import serializers
from .models import Tag, Link, Movie, User

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'tagname']

class LinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Link
        fields = ['id', 'linkname', 'linkurl']

class MovieSerializer(serializers.ModelSerializer):
    tags = serializers.SlugRelatedField(
        many=True,
        slug_field='tagname',
        queryset=Tag.objects.all()
    )
    moviesrc = serializers.FileField(required=True)

    class Meta:
        model = Movie
        fields = ['id', 'movietitle', 'movietype', 'description', 'createdtime', 'moviesrc', 'socialink', 'hearts', 'tags']
        read_only_fields = ['hearts']


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

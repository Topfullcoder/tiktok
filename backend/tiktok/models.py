from django.db import models
from datetime import datetime

class Tag(models.Model):
    tagname = models.CharField(unique=True, max_length=255)

    def __str__(self):
        return self.tagname

class Link(models.Model):
    linkname = models.CharField(unique=True, max_length=255)
    linkurl = models.CharField(unique=True, max_length=255)

    def __str__(self):
        return self.linkname

class Movie(models.Model):
    movietitle = models.CharField(unique=True, max_length=255)
    movietype = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    createdtime = models.DateTimeField(default=datetime.now)
    moviesrc = models.FileField(upload_to='movies')
    socialink = models.CharField(max_length=1000)
    hearts = models.IntegerField(default=0)
    tags = models.ManyToManyField(Tag)

    def __str__(self):
        return self.movietitle

class User(models.Model):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    hearts = models.ManyToManyField(Movie, blank=True)

# Generated by Django 4.2.1 on 2023-05-13 23:45

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tiktok', '0004_alter_movie_createdtime'),
    ]

    operations = [
        migrations.AlterField(
            model_name='movie',
            name='createdtime',
            field=models.DateTimeField(blank=None, default=datetime.datetime(2023, 5, 13, 18, 45, 1, 451956), null=None),
        ),
    ]

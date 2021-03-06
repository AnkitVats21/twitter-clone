# Generated by Django 3.1.2 on 2020-11-03 19:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tweet', '0008_likes'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='likes',
            options={'verbose_name': 'Like', 'verbose_name_plural': 'Likes'},
        ),
        migrations.RemoveField(
            model_name='tweet',
            name='likes',
        ),
        migrations.RemoveField(
            model_name='likes',
            name='tweet',
        ),
        migrations.AddField(
            model_name='likes',
            name='tweet',
            field=models.ManyToManyField(to='tweet.Tweet'),
        ),
    ]

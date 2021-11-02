# Generated by Django 3.1.2 on 2021-11-01 15:11

import accounts.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('email', models.EmailField(max_length=254, unique=True, verbose_name='primary_email')),
                ('is_active', models.BooleanField(default=False)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_superuser', models.BooleanField(default=False)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=55)),
                ('name', models.CharField(max_length=55)),
                ('dob', models.DateField(blank=True, null=True)),
                ('bio', models.TextField(blank=True, null=True)),
                ('picture', models.ImageField(blank=True, max_length=1000, null=True, upload_to=accounts.models.UserProfile.picture_upload)),
                ('location', models.CharField(blank=True, max_length=255, null=True)),
                ('website', models.URLField(blank=True, max_length=255, null=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='profile', to='accounts.user')),
            ],
        ),
    ]
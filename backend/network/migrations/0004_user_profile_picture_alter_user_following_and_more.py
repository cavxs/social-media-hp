# Generated by Django 4.1.5 on 2023-05-03 17:45

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0003_alter_userprofile_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='profile_picture',
            field=models.ImageField(blank=True, null=True, upload_to='profile_pictures'),
        ),
        migrations.AlterField(
            model_name='user',
            name='following',
            field=models.ManyToManyField(blank=True, null=True, related_name='followers', to=settings.AUTH_USER_MODEL),
        ),
        migrations.DeleteModel(
            name='UserProfile',
        ),
    ]

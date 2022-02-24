from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Note(models.Model):
    body = models.TextField()
    priority = models.IntegerField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
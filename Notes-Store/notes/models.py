from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Note(models.Model):
    body = models.TextField()
    priority = models.IntegerField()
    header = models.CharField(max_length=40)
    date = models.DateField(auto_now=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
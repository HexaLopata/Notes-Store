from .views import *
from django.urls import path

urlpatterns = [
    path('note/', GetCreateNotesView.as_view()),
    path('note/<int:pk>/', DeleteUpdateNotesView.as_view())
]

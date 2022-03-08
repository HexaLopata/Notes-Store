from .views import *
from django.urls import path

urlpatterns = [
    # accepts GET and POST requests to get or create notes
    path('notes/', GetCreateNotesView.as_view()),
    # accepts DELETE and PATCH requests to delete or update note
    path('notes/<int:pk>/', DeleteUpdateNotesView.as_view())
]

from functools import partial
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from .models import Note
from .serializers import NoteSerializer
from session_auth.permissions import IsOwner

class GetCreateNotesView(APIView):
    def get(self, *args, **kwargs):
        user = self.request.user
        notes = Note.objects.filter(author=user)
        return Response(NoteSerializer(notes, many=True).data, status=200)

    def post(self, *args, **kwargs):
        user = self.request.user
        data = self.request.data
        note_serializer = NoteSerializer(data=data)
        if note_serializer.is_valid():
            note_serializer.save(author=user)
            return Response(note_serializer.data, status=201)
        else:
            return Response(note_serializer.errors, status=400)

class DeleteUpdateNotesView(generics.GenericAPIView):
    queryset = Note.objects.all()
    permission_classes = [IsOwner]

    def patch(self, request, *args, **kwargs):
        note = self.get_object()
        note_serializer = NoteSerializer(note, self.request.data, partial=True)
        if note_serializer.is_valid():
            note_serializer.save()
            return Response(note_serializer.data, status=200)
        else:
            return Response(note_serializer.errors, status=400)

    def delete(self, request, *args, **kwargs):
        note = self.get_object()
        note.delete()
        return Response(status=204)    
        
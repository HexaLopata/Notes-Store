from functools import partial
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from .models import Note
from .serializers import NoteSerializer
from session_auth.permissions import IsOwner


class GetCreateNotesView(APIView):
    """
    Accepts GET and POST requests to get or create notes.\n
    If GET params contains 'count_only=true' returns { 'count': <current_account_notes_count> }\n
    POST input data:
    body: str
    priority: int
    header: str
    """

    def get(self, *args, **kwargs):
        user = self.request.user
        count_only = self.request.query_params.get('count_only')
        if (count_only is not None) and (count_only.lower() == 'true'):
            return Response({'count': Note.objects.filter(author=user).count()}, status=200)

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
    """
    Accepts DELETE and PATCH requests to delete or update note\n
    PATCH input data:
    body: str     !optional
    priority: int !optional
    header: str   !optional
    """
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

from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note
# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class=UserSerializer
    permission_classes=[AllowAny]

#view for creating a new Note
# list all notes created by user and if not created then create a list 
class NoteListCreate(generics.ListCreateAPIView):
    serializer_class=NoteSerializer
    permission_classes = [IsAuthenticated]
    #query Set for all notes by a user
    #customization some create methods to add custom fields
    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user) 
    #create a new note
    def perform_create(self, serializer):
        if serializer.is_valid():
            #read only author so we add it here manually
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user) 
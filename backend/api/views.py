from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer, CoursesSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note, Profile, Courses
from rest_framework.response import Response

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
            note=serializer.save(author=self.request.user)
            profile, created = Profile.objects.get_or_create(user=self.request.user)
            profile.contributed_courses.add(note.course)
        else:
            print(serializer.errors)

class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user) 

class UserProfileView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

# View for listing and creating courses
class CoursesListCreateView(generics.ListCreateAPIView):
    queryset = Courses.objects.all()
    serializer_class = CoursesSerializer
    permission_classes = [IsAuthenticated]

# View for retrieving, updating, or deleting a specific course
class CoursesDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Courses.objects.all()
    serializer_class = CoursesSerializer
    permission_classes = [IsAuthenticated]
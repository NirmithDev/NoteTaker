from django.shortcuts import render, get_object_or_404
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer, CoursesSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note, Profile, Courses
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError

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
        course_id = self.request.data.get('course')  # Get the course ID from the request data
        if course_id:
            try:
                course = Courses.objects.get(id=course_id)  # Fetch the course object
                note = serializer.save(author=self.request.user, course=course)  # Save the note with the course
                profile, created = Profile.objects.get_or_create(user=self.request.user)
                profile.contributed_courses.add(note.course)
            except Courses.DoesNotExist:
                raise ValidationError(f"Course with ID {course_id} does not exist.")
        else:
            raise ValidationError("Course is required.")

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

class CourseNotesList(generics.ListAPIView):
    serializer_class = NoteSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        course_id = self.kwargs['course_id']
        course = get_object_or_404(Courses, id=course_id)
        user = self.request.user
        if user.is_authenticated:
            return Note.objects.filter(course=course)
        else:
            return Note.objects.filter(course=course, is_public=True)

class UserContributedCoursesList(generics.ListAPIView):
    serializer_class = CoursesSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        profile, created = Profile.objects.get_or_create(user=user)
        return profile.contributed_courses.all()
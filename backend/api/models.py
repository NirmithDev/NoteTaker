from django.db import models
from django.contrib.auth.models import User
#from django.db.models.signals import post_save
#from django.dispatch import receiver
# Create your models here.

#create a class for "Courses"
class Courses(models.Model):
    title = models.CharField(max_length=100)
    def __str__(self):
        return self.title

class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")
    course = models.ForeignKey(Courses, on_delete=models.CASCADE, related_name="course_notes")
    is_public = models.BooleanField(default=False)
    #add tags for topics section this will be a foreign key
    def __str__(self):
        return self.title

#User Profile
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    location = models.CharField(max_length=100, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    contributed_courses = models.ManyToManyField(Courses, related_name="contributors", blank=True)
    
    def __str__(self):
        return self.user.username

#create a connection for university
#   to which courses to be interconnected
from django.urls import path
from . import views
urlpatterns = [
    path('courses/', views.CoursesListCreateView.as_view(), name='courses-list-create'),
    path('courses/<int:pk>/', views.CoursesDetailView.as_view(), name='courses-detail'),
    path('courses/<int:course_id>/notes/', views.CourseNotesList.as_view(), name='course-notes-list'),  # New URL pattern
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
    path("profile/", views.UserProfileView.as_view(), name="user-profile"),
]
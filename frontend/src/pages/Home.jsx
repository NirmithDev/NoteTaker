import React, { useState, useEffect } from 'react';
import api from '../api';
import Notes from '../components/Notes';
import '../styles/Home.scss';

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');

  useEffect(() => {
    getNotes();
    getCourses();  // Fetch courses when the component loads
  }, []);

  const getNotes = () => {
    api.get('/api/notes/')
      .then(res => res.data)
      .then(data => { setNotes(data); console.log(data); })
      .catch(error => alert(error));
  };

  const getCourses = () => {
    api.get('/api/courses/')
      .then(res => res.data)
      .then(data => { setCourses(data); console.log(data); })
      .catch(error => alert(error));
  };

  const deleteNote = (id) => {
    api.delete(`/api/notes/delete/${id}/`)
      .then(res => {
        if (res.status === 204) alert('Note Deleted');
        else alert('Failed to delete note');
        getNotes();
      })
      .catch(error => alert(error));
  };

  const createNote = (e) => {
    e.preventDefault();
    const course_id = selectedCourseId; // This should be set based on user input
    api.post("/api/notes/", { content, title, course: course_id })
      .then((res) => {
          if (res.status === 201) alert("Note created successfully");
          else alert("Failed to make note");
          getNotes();
      })
    .catch((error) => alert(error));
  };

  return (
    <div>
      <div>
        <h2>Notes</h2>
        {notes.map((note) => (
          <Notes note={note} onDelete={deleteNote} key={note.id} />
        ))}
      </div>
      <h2>Create a Note</h2>
      <form onSubmit={createNote}>
        <label htmlFor='title'>Title:</label>
        <br />
        <input type='text' id='title' name='title' required onChange={(e) => setTitle(e.target.value)} value={title} />
        <br />
        <label htmlFor='content'>Content:</label>
        <br />
        <textarea id='content' name='content' required onChange={(e) => setContent(e.target.value)} value={content}></textarea>
        <br />
        <label htmlFor='course'>Course:</label>
        <br />
        <select id='course' name='course' required onChange={(e) => setSelectedCourse(e.target.value)} value={selectedCourse}>
          <option value='' disabled>Select a course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>
        <br />
        <input type='submit' value='Submit' />
      </form>
    </div>
  );
};

export default Home;

import React, { useState } from 'react';
import api from '../api';

const Courses = () => {
    const [title, setTitle] = useState('');

    const createCourse = (e) => {
        e.preventDefault();
        api.post('/api/courses/', { title })
            .then((res) => {
                if (res.status === 201) alert('Course created successfully');
                else alert('Failed to create course');
            })
            .catch((error) => alert(error));
    };

    return (
        <div>
            <h2>Create a New Course</h2>
            <form onSubmit={createCourse}>
                <label htmlFor="title">Course Title:</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <br />
                <input type="submit" value="Create Course" />
            </form>
        </div>
    );
};

export default Courses;
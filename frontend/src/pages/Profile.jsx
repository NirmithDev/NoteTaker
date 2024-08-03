import React, { useState, useEffect } from 'react';
import api from '../api'; // Import the api instance
import '../styles/Profile.scss'; // Import the CSS file
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { TextField, InputAdornment } from '@mui/material';
import Notes from '../components/Notes'; // Import the Notes component

const Profile = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    bio: '',
    location: '',
    birth_date: '',
  });
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch user data
  useEffect(() => {
    api.get('api/profile/')
      .then(response => {
        setUser(response.data);
        setProfile(response.data.profile || {});
        setFormData({
          username: response.data.username,
          bio: response.data.profile?.bio || '',
          location: response.data.profile?.location || '',
          birth_date: response.data.profile?.birth_date || '',
        });
      })
      .catch(error => console.error('Error fetching profile:', error));
  }, []);

  // Fetch notes
  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api.get('api/notes/')
      .then(response => setNotes(response.data))
      .catch(error => alert(error));
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    api.put('api/profile/', formData)
      .then(response => {
        setUser(response.data);
        setProfile(response.data.profile || {});
        setEditMode(false);
      })
      .catch(error => console.error('Error updating profile:', error));
  };

  // Delete note
  const deleteNote = (id) => {
    api.delete(`/api/notes/${id}/`)
      .then(() => {
        setNotes(notes.filter(note => note.id !== id));
      })
      .catch(error => alert(error));
  };

  const showDeleteButton = true; // Update this value as needed

  // Filter notes based on search query
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <AccountCircleIcon style={{ fontSize: 100 }} className="profile-icon" />
        <h1>{user.username}</h1>
      </div>
      <div className="profile-details">
        {editMode ? (
          <form onSubmit={handleSubmit}>
            <label htmlFor="bio">Bio:</label>
            <input
              type="text"
              name="bio"
              id="bio"
              value={formData.bio}
              onChange={handleChange}
            />
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              name="location"
              id="location"
              value={formData.location}
              onChange={handleChange}
            />
            <label htmlFor="birth_date">Birth Date:</label>
            <input
              type="date"
              name="birth_date"
              id="birth_date"
              value={formData.birth_date}
              onChange={handleChange}
            />
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
          </form>
        ) : (
          <div>
            <p><strong>Bio:</strong> {profile.bio || 'N/A'}</p>
            <p><strong>Location:</strong> {profile.location || 'N/A'}</p>
            <p><strong>Birth Date:</strong> {profile.birth_date || 'N/A'}</p>
            <button onClick={() => setEditMode(true)}>Edit Profile</button>
          </div>
        )}
      </div>
      <div className="notes-section">
        <div className="search-container">
          <TextField
            variant="outlined"
            placeholder="Search notes"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                  <FilterListIcon style={{ marginLeft: 8 }} />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div>
          <h2>Notes</h2>
          {filteredNotes.map(note => (
            <Notes note={note} onDelete={deleteNote} onDisabled={showDeleteButton} key={note.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;

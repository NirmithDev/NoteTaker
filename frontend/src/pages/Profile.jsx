import React, { useState, useEffect } from 'react';
import api from '../api'; // Import the api instance
//import './ProfilePage.css'; // Import the CSS file

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

  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src="/default-person-icon.png" alt="Profile Icon" className="profile-icon" />
        <h1>{user.username}</h1>
      </div>
      <div className="profile-details">
        {editMode ? (
          <form onSubmit={handleSubmit}>
            <label>
              Bio:
              <input
                type="text"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
              />
            </label>
            <label>
              Location:
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </label>
            <label>
              Birth Date:
              <input
                type="date"
                name="birth_date"
                value={formData.birth_date}
                onChange={handleChange}
              />
            </label>
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
    </div>
  );
};

export default Profile;


import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import ProfileView from '../components/ProfileView';
import ProfileEdit from '../components/ProfileEdit';
import UserBookedSlot from '../components/UserBookedSlot';
import Booking from '../components/Booking';
import { URL } from '../config.js'


const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    mmr: '',
    bio: '',
    username: '',
    ign: ''
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${URL}/user/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const responseData = await response.json();
      setUserData(responseData);
      setEditFormData({
        mmr: responseData.mmr || '',
        bio: responseData.bio || '',
        username: responseData.username || '',
        ign: responseData.ign || ''
      }); 
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleEditButtonClick = () => {
    setIsEditing(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${URL}/user/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editFormData),
      });

      const responseData = await response.json();

      if (response.ok) {
        setIsEditing(false);
        fetchUserData();
      } else {
        alert(responseData.message);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('An error occurred while updating the profile');
    }
  };

  return (
    <div className='flex flex-col items-center w-full min-h-screen bg-custom-gradient gap-6 pt-4'>
      <Navigation />
      {!isEditing ? (
        <ProfileView 
          userData={userData} 
          onEditClick={handleEditButtonClick} 
        />
      ) : (
        <ProfileEdit
          editFormData={editFormData}
          onFormChange={handleFormChange}
          onFormSubmit={handleFormSubmit}
        />
      )}
      <div className='flex w-full max-w-screen-lg bg-box-color'>
        <UserBookedSlot />
        <Booking />
      </div>
    </div>
  );
};

export default Profile;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PopupMessage from './PopupMessage'
import { URL } from '../config.js';
import LoadingSpinner from '../components/LoadingSpinner';


const LoginUser = () => {
  const [username, setUsername] = useState('@');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const responseData = await response.json();

      if (response.ok) {
        localStorage.setItem('token', responseData.token);
        setPopupTitle('Login Successful');
        setPopupMessage('You will be redirected to your profile.');
        setIsPopupOpen(true);
      } else {
        setPopupTitle('Login Failed');
        setPopupMessage(responseData.message);
        setIsPopupOpen(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setPopupTitle('Error');
      setPopupMessage(error.message);
      setIsPopupOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    if (!value.startsWith('@')) {
      setUsername('@' + value);
    } else {
      setUsername(value);
    }
  };

  const handlePopupConfirm = () => {
    setIsPopupOpen(false);
    navigate('/profile');
  };

  return (
    <div className='h-full w-full bg-form flex '>
      <PopupMessage
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        title={popupTitle}
        message={popupMessage}
        onConfirm={handlePopupConfirm}
      />
      <form onSubmit={handleSubmit} className="p-4 h-full flex flex-col gap-6 w-full">
        <h2 className="text-2xl font-bold mb-4">Log In</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Username:</label>
          <input
            type="text"
            value={username.slice(1)}
            onChange={handleUsernameChange}
            className="w-full px-3 py-2 border border-gray-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300"
            required
          />
        </div>
        <button type="submit" className="w-full py-2 bg-button hover:border-2 border-black text-black font-bold">
        {isLoading ? <LoadingSpinner /> : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginUser;

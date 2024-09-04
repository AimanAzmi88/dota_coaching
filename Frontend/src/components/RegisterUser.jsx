import { useState } from 'react';
import PopupMessage from './PopupMessage';
import LoadingSpinner from '../components/LoadingSpinner';
import { URL } from '../config.js'

const RegisterUser = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupTitle, setPopupTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${URL}/register`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const responseData = await response.json();

      if (response.ok) {
        setPopupMessage('You may login now');
        setPopupTitle('Registration Successful');
      } else {
        setPopupMessage(responseData.message);
        setPopupTitle('Registration Failed');
      }

      setIsPopupOpen(true);

    } catch (error) {
      console.error('Error:', error);
      setPopupMessage(error.message);
      setIsPopupOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='h-full w-full bg-form flex'>
      <PopupMessage
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        title={popupTitle}
        message={popupMessage}
      />
      <form onSubmit={handleSubmit} className="p-4 bg-form h-full flex flex-col gap-6 w-full">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          {isLoading ? <LoadingSpinner /> : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default RegisterUser;

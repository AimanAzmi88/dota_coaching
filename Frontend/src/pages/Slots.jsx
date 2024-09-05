import { useEffect, useState } from 'react';
import Navigation from '../components/Navigation.jsx';
import { URL } from '../config.js';
import AllUserSlot from '../components/AllUserSlot.jsx';
import UserSlot from '../components/UserSlot.jsx';
import bookSlot from '../Utils/bookSlot.js';
import LoadingSpinner from '../components/LoadingSpinner.jsx';

const DataFetcher = () => {
  const [slot, setSlot] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSlots = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${URL}/slot`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      setSlot(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBook = (id) => {
    bookSlot(id, fetchSlots);
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const [showDiv1, setShowDiv1] = useState(true);

  const showFirstDiv = () => {
    setShowDiv1(true);
  };

  const showSecondDiv = () => {
    setShowDiv1(false);
  };

  const [activeButton, setActiveButton] = useState('a');

  const handleButtonClick = (button) => {
    setActiveButton(button);
    if (button === 'a') {
      showFirstDiv();
    } else {
      showSecondDiv();
    }
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-custom-gradient gap-6 pt-4">
      <Navigation />
      <div className='flex gap-4'>
        <button
          className={`py-2 px-4 ${activeButton === 'a' ? 'bg-button text-white border-2 border-black shadow-xl' : 'text-black'} transition-colors duration-500`}
          onClick={() => handleButtonClick('a')}
        >
          All Slots
        </button>
        <button
          className={`py-2 px-4 ${activeButton === 'b' ? 'bg-button text-white border-2 border-black shadow-xl' : 'text-black'} transition-colors duration-500`}
          onClick={() => handleButtonClick('b')}
        >
          Your Slots
        </button>
      </div>
      <div className='bg-slot max-w-screen-lg w-full flex justify-center flex-col p-3 border-4 border-black'>
        {
          showDiv1 ? (
            isLoading ? (
              <LoadingSpinner />
            ) : (
              <AllUserSlot 
                slot={slot}
                handleBook={handleBook}
              />
            )
          ) : (
            <UserSlot />
          )
        }
      </div>
    </div>
  );
};

export default DataFetcher;

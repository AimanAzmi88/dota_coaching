import { useEffect, useState } from "react";
import { URL } from '../config.js';
import deleteSlot from "../Utils/deleteSlot.js";
import formatTimestamp from "../Utils/formatTimeStamp.js";

const UserBookedSlot = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${URL}/slot/booked`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching user slot:', error);
    }
  };

  const handleMarkComplete = async (slotId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${URL}/slot/complete`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id: slotId })
      });

      if (response.ok) {
        setData(data.map(slot => 
          slot.id === slotId ? { ...slot, status: true } : slot
        ));
      } else {
        console.error('Error marking slot as complete');
      }
    } catch (error) {
      console.error('Error marking slot as complete:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    deleteSlot(id, fetchData);
   }

  return (
    <div className="w-full border-2 border-black px-2">
      <h2 className="text-2xl font-semibold mb-4 text-center">Your Activity</h2>
      {data.length > 0 ? (
        data.map((slot) => (
          <div key={slot.id} className="bg-white p-4 mb-4 border border-gray-300 rounded-lg shadow-sm">
            <p className="text-gray-700 mb-1"><strong>Description:</strong> {slot.description}</p>
            <p className="text-gray-700 mb-1"><strong>Timestamp:</strong> {formatTimestamp(slot.timestamp)}</p>
            <p className="text-gray-700 mb-1"><strong>Booked By:</strong> {slot.username}</p>
            {!slot.status ? (
                        <button
                          onClick={() => handleMarkComplete(slot.id)}
                          className="bg-button mt-3 px-2 rounded h-8 hover:bg-buttonh"
                        >
                          Mark as complete
                        </button>
            ):(
                        <button
                          className="bg-button mt-3 px-2 rounded h-8"
                          disabled
                        >
                          Completed
                        </button>
            )}

            {slot.status && (
            <button
              onClick={() => handleDelete(slot.id)}
              className="py-1 px-3 mx-2 bg-red-500 text-white border border-red-700 rounded hover:bg-red-700 transition-colors duration-300"
            >
              Delete
            </button>
             )}
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600">No Booking at this time</p>
      )}
    </div>
  );
};

export default UserBookedSlot;

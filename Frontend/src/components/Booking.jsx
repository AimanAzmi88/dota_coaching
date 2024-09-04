import { useState, useEffect } from 'react';
import { URL } from '../config.js';
import formatTimestamp from '../Utils/formatTimeStamp.js';



const Booking = () => {
    const [data, setData] = useState([]);
    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${URL}/slot/booking`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json();
            setData(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []); 

    return (
      <div className="w-full border-2 border-black px-2">
        <h2 className="text-2xl font-semibold mb-4 text-center">Booked Slots</h2>
        {data.length > 0 ? (
          data.map((slot) => (
            <div key={slot.id} className="bg-white p-4 mb-4 border border-gray-300 rounded-lg shadow-sm">
              <p className="text-gray-700 mb-1"><strong>Description:</strong> {slot.description}</p>
              <p className="text-gray-700 mb-1"><strong>Timestamp:</strong> {formatTimestamp(slot.timestamp)}</p>
              <p className="text-gray-700 mb-1"><strong>Posted By:</strong> {slot.username}</p>
              {slot.status ? (
                        <div className="w-1/4 py-1 mt-4 px-2 rounded bg-green-400">Complete</div>
                    ) : (
                        <div className="w-1/4 py-1 mt-4 px-2 rounded bg-yellow-400">On Going</div>
                    )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No Booking at this time</p>
        )}
      </div>
    );
};

export default Booking;

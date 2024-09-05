import { useEffect, useState } from "react";
import { URL } from "../config.js";
import formatTimestamp from "../Utils/formatTimeStamp.js";
import deleteSlot from "../Utils/deleteSlot.js";

const UserSlot = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${URL}/slot/user`, {
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

 const handleDelete = (id) => {
  deleteSlot(id, fetchData);
 }

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className="flex flex-col gap-3 p-2 ">
      {data.length > 0 ? (
        data.map((slot) => (
          <div key={slot.id} className="bg-white p-4 mb-4 border border-gray-300 rounded-lg shadow-xl">
            <p className="text-gray-700 mb-1"><strong>Description:</strong> {slot.description}</p>
            <p className='text-gray-700 mb-1'><strong>Posted On:</strong> {formatTimestamp(slot.timestamp)}</p>
            <p className="text-gray-700 mb-1"><strong>Position:</strong> {slot.position}</p>
            <button
              onClick={() => handleDelete(slot.id)}
              className="bg-button py-2 px-4 rounded hover:bg-buttonh"
            >
              Delete slot
            </button>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600">No Slot Available</p>
      )}
    </div>
  );
};

export default UserSlot;

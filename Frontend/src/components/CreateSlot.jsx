import { useState } from 'react';
import PropTypes from 'prop-types';
import { URL } from '../config.js';

const CreateSlot = ({ onFormSubmit }) => {
  const [position, setPosition] = useState('');
  const [description, setDescription] = useState('');

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setPosition(selectedValue);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postToApi(position, description);
    if (onFormSubmit) {
      onFormSubmit(position, description);
    }
  };

  const postToApi = async (option, desc) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${URL}/slot`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ position: option, description: desc }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data.message);

    } catch (error) {
      console.error('Error posting to API:', error);
    }
  };

  const handleCancel = () => {
    if (onFormSubmit) {
      onFormSubmit();
    }
  };

  return (
    <div className="fixed z-50 inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-form p-6 shadow-lg rounded-lg max-w-lg w-full">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Create a Slot</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-lg mb-2">Description:</label>
            <input
              required
              type="text"
              value={description}
              onChange={handleDescriptionChange}
              className="w-full p-3 h-32 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter slot description"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-lg mb-2">Position:</label>
            {['Safelane', 'Midlane', 'Offlane', 'Support', 'Hard Support'].map((pos) => (
              <label key={pos} className="text-gray-800 mb-2 flex items-center">
                <input
                  required
                  name="position"
                  type="radio"
                  value={pos}
                  checked={position === pos}
                  onChange={handleOptionChange}
                  className="mr-2"
                />
                <span>{pos}</span>
              </label>
            ))}
          </div>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="w-full py-2 bg-red-400 text-white rounded-lg hover:bg-red-600 transition duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

CreateSlot.propTypes = {
  onFormSubmit: PropTypes.func,
};

export default CreateSlot;

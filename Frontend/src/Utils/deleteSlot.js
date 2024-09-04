import { URL } from "../config.js";

const deleteSlot = async (id,fetchData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${URL}/slot`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id : `${id}` })
      });

      if (response.ok) {
        fetchData();
      } else {
        console.error('Failed to update item');
      }
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  export default deleteSlot;
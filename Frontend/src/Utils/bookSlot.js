import { URL } from "../config.js";

const bookSlot = async (id,fetchSlots) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${URL}/slot`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id: `${id}` })
      });

      if (response.ok) {
        fetchSlots();
      } else {
        console.error('Failed to update item');
      }
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

export default bookSlot;
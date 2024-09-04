import { useState } from 'react';
import Slot from './CreateSlot';

function Modal() {
  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState('');

  return (
    <div className="p-6">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => setShowModal(true)}
      >
        Open Modal
      </button>

      <Slot
        showModal={showModal}
        setShowModal={setShowModal}
        description={description}
        setDescription={setDescription}
      />
    </div>
  );
}

export default Modal;

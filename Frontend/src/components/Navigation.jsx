import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CreateSlot from "./CreateSlot";
import PopupMessage from "./PopupMessage";

const Navigation = () => {
  const navigate = useNavigate();
  const [showCreateSlot, setShowCreateSlot] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupTitle, setPopupTitle] = useState('');

  const toggleCreateSlot = () => {
    setShowCreateSlot(!showCreateSlot);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleSignOutClick = () => {
    setPopupTitle('Sign Out');
    setPopupMessage('Are you sure you want to sign out?');
    setIsPopupOpen(true);
  };

  const handleConfirmSignOut = () => {
    localStorage.removeItem('token');
    navigate('/');
    setIsPopupOpen(false);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="sticky top-2 z-10 text-black bg-form w-full h-12 flex gap-4 px-2 border-black shadow-bold justify-between items-center">
      <div className="flex gap-4">
        <button onClick={() => handleNavigation('/slot')} className="hover:underline">Slots</button>
        <button onClick={() => handleNavigation('/profile')} className="hover:underline">Profile</button>
        <button onClick={toggleCreateSlot} className="hover:underline">Create Slot</button>
        {showCreateSlot && (
          <div>
            <CreateSlot 
              onFormSubmit={toggleCreateSlot}
            />
          </div>
        )}
      </div>
      <div>
      <button onClick={handleSignOutClick} className="hover:underline">Sign out</button>

        <PopupMessage
          isOpen={isPopupOpen}
          onClose={handlePopupClose}
          title={popupTitle}
          message={popupMessage}
          onConfirm={handleConfirmSignOut}
        />
      </div>
    </div>
  );
};

export default Navigation;

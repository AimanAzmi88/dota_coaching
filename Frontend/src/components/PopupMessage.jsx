import PropTypes from 'prop-types';

const PopupMessage = ({ isOpen, onClose, title, message, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md p-4 flex items-center justify-center">
      <div className="relative bg-white p-6 shadow-lg rounded-lg w-full">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="mb-4">{message}</p>
        <div className="flex gap-2">
          {onConfirm && (
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="py-2 px-4 bg-button text-black font-bold hover:bg-buttonh rounded"
            >
              Confirm
            </button>
          )}
          <button
            onClick={onClose}
            className="py-2 px-4 bg-gray-300 text-black font-bold hover:bg-gray-400 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

PopupMessage.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func,
};

export default PopupMessage;

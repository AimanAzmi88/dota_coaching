import PropTypes from 'prop-types';

const ProfileEdit = ({ editFormData, onFormChange, onFormSubmit }) => {
  return (
    <div className='max-w-screen-lg w-full flex flex-col justify-center items-center'>
      <div className='w-full max-w-md p-8 bg-white border-2 border-black shadow-bold'>
        <h1 className='text-2xl font-bold text-gray-800 mb-6 text-center bg-form border-2 border-black'>Updating your Dota profile: like recalibrating MMR, but with more cosmetic flair.</h1>
        <form onSubmit={onFormSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">MMR:</label>
            <input
              type="text"
              name="mmr"
              value={editFormData.mmr}
              onChange={onFormChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Bio:</label>
            <input
              type="text"
              name="bio"
              value={editFormData.bio}
              onChange={onFormChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">IGN:</label>
            <input
              type="text"
              name="ign"
              value={editFormData.ign}
              onChange={onFormChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

ProfileEdit.propTypes = {
  editFormData: PropTypes.shape({
    mmr: PropTypes.number.isRequired,
    bio: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    ign: PropTypes.string.isRequired
  }).isRequired,
  onFormChange: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired
};

export default ProfileEdit;

import PropTypes from 'prop-types'

const ProfileView = ({ userData, onEditClick }) => {
  return (
    <div className='max-w-screen-lg flex flex-col w-full justify-between bg-default p-4 border-4 border-black'>
      {userData && (
        <div className='flex'>
            <img className='size-60 rounded-full hover:scale-110 transition-transform duration-400 ease-in-out' src="default.jpg" alt="" />
          <div className='w-2/3 ml-3'>
            <div className='flex justify-between p-3'>
              <p className='text-3xl'>Welcome, {userData.username}</p>
              <p className=''>Current MMR: {userData.mmr}</p>
            </div>
            <p><strong>Bio:</strong> {userData.bio}</p>
            <p><strong>IGN:</strong> {userData.ign}</p>
          </div>
        </div>
      )}
      <button
        onClick={onEditClick}
        className="bg-button m-4 p-4 hover:bg-buttonh text-black font-bold"
      >
        Edit Profile
      </button>
    </div>
  );
};

ProfileView.propTypes = {
    userData: PropTypes.shape({
      username: PropTypes.string.isRequired,
      mmr: PropTypes.number,
      bio: PropTypes.string,
      user_id: PropTypes.number,
      ign: PropTypes.string
    }),
    onEditClick: PropTypes.func.isRequired
  };

export default ProfileView;

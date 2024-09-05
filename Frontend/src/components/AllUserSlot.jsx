
import PropTypes from 'prop-types'
import formatTimestamp from '../Utils/formatTimeStamp.js'

const AllUserSlot = ({slot, handleBook}) => {



return (
    <div className='flex flex-col gap-3 p-2 '>
    {slot.length > 0 ? (
      slot.map((item) => (
        <div key={item.id} className='bg-white p-4 mb-4 border border-gray-300 rounded-lg shadow-xl'>
            <p className="text-gray-700 mb-1"><strong>Posted by:</strong> {item.username}</p>          
            <p className="text-gray-700 mb-1"><strong>Description:</strong> {item.description}</p>
            <p className="text-gray-700 mb-1"><strong>Posted On:</strong>{formatTimestamp(item.timestamp)}</p>
            <p className="text-gray-700 mb-1"><strong>Position:</strong> {item.position}</p>        
          <button
            className='bg-button py-2 px-4 rounded hover:bg-buttonh'
            onClick={() => !item.book && handleBook(item.id)}
          >
            {item.book? 'Booked by another user':'Book this slot'}
          </button>
        </div>
      ))
    ) : (
      <p className="text-center text-gray-600">No Slot Available</p>

    )}
  </div>
  )
}

AllUserSlot.propTypes = {
    slot: PropTypes.array.isRequired,
    handleBook: PropTypes.func.isRequired
  
}

export default AllUserSlot
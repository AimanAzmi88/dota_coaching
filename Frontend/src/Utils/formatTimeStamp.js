import { format } from 'date-fns';


const formatTimestamp = (timestamp) => {
    return format(new Date(timestamp), 'eeee, p'); // Example format: 'Jul 7, 2024, 7:29:28 AM'
};

export default formatTimestamp;
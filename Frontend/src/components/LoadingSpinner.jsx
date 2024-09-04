import PropagateLoader from "react-spinners/PropagateLoader";


const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen absolute inset-0 bg-white bg-opacity-50">
  <PropagateLoader size={15} />
</div>
);

export default LoadingSpinner;

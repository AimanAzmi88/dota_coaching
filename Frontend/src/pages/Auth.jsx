import ToggleDiv from '../components/Toggle';

const Auth = () => {
  return (
    <div className="flex flex-col items-center justify-start gap-2 p-2 w-full h-screen bg-custom-gradient">
      <h1 className='text-black bg-box-color p-2 border-black border-2'>Welcome to the land of authentication, where you get to prove you’re a real person. How exciting</h1>
      <div className="w-full max-w-screen-lg md:w-2/5 h-5/6 border-black border-4">
        <ToggleDiv />
      </div>
    </div>
  );
};

export default Auth;

import { useState } from 'react';
import RegisterUser from './RegisterUser';
import LoginUser from './LogInUser';

const ToggleDiv = () => {
  const [isLeft, setIsLeft] = useState(true);

  const togglePosition = () => {
    setIsLeft(!isLeft);
  };

  return (
    <div className="h-full flex flex-col items-center bg-form">
      <div className="flex w-full h-full justify-end items-center">
        {isLeft ? <LoginUser /> : <RegisterUser />}
      </div>
      {isLeft ? <p>takda akaun?</p>:<p>dah ada akaun?</p>}
      <button
        onClick={togglePosition}
        className=" bg-button m-4 px-6 py-4 hover:bg-buttonh text-black font-bold"
      >
        {isLeft ? 'Sign Up' : 'Sign In'}
      </button>
    </div>
  );
};

export default ToggleDiv;

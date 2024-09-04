import { AiFillInstagram, AiFillYoutube } from "react-icons/ai";
import { GiPunch } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/auth');
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-custom-gradient gap-4 pb-6">
      <div className="max-w-screen-lg w-full flex flex-col sm:flex-row justify-between items-center p-4">
        <div className="flex items-center mb-4 sm:mb-0">
          <GiPunch className="text-white text-6xl sm:text-8xl" />
          <h1 className="text-white text-3xl sm:text-4xl font-bold italic tracking-widest ml-2">B4B</h1>
        </div>
        <div className="flex gap-3">
          <a href="https://www.instagram.com/odpixel_/"><AiFillInstagram className="text-white text-2xl hover:text-button" /></a>
          <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"><AiFillYoutube className="text-white text-2xl hover:text-button" /></a>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-end justify-start w-full max-w-screen-lg h-80 border-4 border-black shadow-bold sm:h-background bg-cover bg-center" style={{ backgroundImage: "url('/wallpaper.jpg')" }}>
        <button onClick={handleClick} className="bg-button m-4 p-4 hover:bg-buttonh text-black font-bold">Get Started</button>
      </div>
      <div className="flex flex-col w-full max-w-screen-lg bg-default p-4 border-2 border-black">
        <h2 className="text-black text-lg">Welcome to our &quot;Definitely Not a Scam&quot; Dota Coaching Bros!</h2>
        <h3 className="text-black font-thin text-sm">Skip the practice! Our Dota coaching offers advice from players who may or may not have climbed ranks. Why learn when you can pay to be told your mistakes? Pick from our packages, get tips that might help—or someone to blame for losses. Join now and enjoy paying for tips you might find on Reddit!</h3>
      </div>
    </div>
  );
};

export default Home;

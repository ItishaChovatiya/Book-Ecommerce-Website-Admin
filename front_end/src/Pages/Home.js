import Hero from "../Components/Home/Hero";
import Recentlyadded from "../Components/Home/Recentlyadded";

const Home = () => {
  return (
    <div className="bg-zinc-900 text-white px-10 py-8">
      <Hero></Hero>
      <Recentlyadded></Recentlyadded>
      <div className="mt-5 mb-5">
        
        <img
          src="https://quotefancy.com/media/wallpaper/3840x2160/7829113-Maureen-Johnson-Quote-A-book-gives-you-everything-It-gives-you-a.jpg"
          className="mx-auto d-block"
        ></img>
      </div>
    </div>
  );
};

export default Home;

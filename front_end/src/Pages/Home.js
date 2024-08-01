import Hero from "../Components/Home/Hero";
import Recentlyadded from "../Components/Home/Recentlyadded";

const Home = () => {
  return (
    <div className="bg-zinc-900 text-white px-10 py-8">
      {/* Hero section: likely contains a large, eye-catching component for the homepage */}
      <Hero />
      
      {/* Recently added books section: displays books that have been recently added */}
      <Recentlyadded />
      
      {/* Image section: displays a motivational or thematic image */}
      <div className="mt-5 mb-5">
        <img
          src="https://quotefancy.com/media/wallpaper/3840x2160/7829113-Maureen-Johnson-Quote-A-book-gives-you-everything-It-gives-you-a.jpg"
          className="mx-auto d-block"
          alt="Inspirational quote about books"
        />
      </div>
    </div>
  );
};

export default Home;

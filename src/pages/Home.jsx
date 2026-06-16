import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div
      className="
      min-h-screen
      bg-white text-black
      dark:bg-black 
      dark:text-white
      "
    >
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
};

export default Home;
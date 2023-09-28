import "./App.css";
import Navbar from "./Navbar";
import Services from "./Services";
import Infographics from "./Infographics";
import About from "./About";
import Testimonials from "./Testimonials";
import Carousel from "./Carousel";
import Product from "./Product";
import LaptopNames from './LaptopNames';


function HomePage() {
  return (
    <div className="App">
      <Navbar />
      <Carousel />
      <LaptopNames />
      <Services />
      <Infographics />
      <About />
      <Testimonials />
    </div>
  );
}

export default HomePage;

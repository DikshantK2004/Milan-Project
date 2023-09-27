import "./App.css";
import Navbar from "./Navbar";
import Services from "./Services";
import Infographics from "./Infographics";
import About from "./About";
import Testimonials from "./Testimonials";
import Carousel from "./Carousel";

function HomePage() {
  return (
    <div>
      <Navbar />
      <Carousel />
      <Services />
      <Infographics />
      <About />
      <Testimonials />
    </div>
  );
}

export default HomePage;

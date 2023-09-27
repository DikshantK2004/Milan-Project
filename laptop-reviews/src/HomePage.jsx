import "./App.css";
import Navbar from "./Navbar";
import Services from "./Services";
import Infographics from "./Infographics";
import About from "./About";
import Testimonials from "./Testimonials";
import Carousel from "./Carousel";
import Product from "./Product";

function HomePage() {
  return (
    <div className="App">
      <Product />
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
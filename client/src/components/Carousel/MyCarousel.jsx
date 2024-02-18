import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css"; // import your custom CSS file here

import slider1 from "../../Assets/slider1.jpg";
import slider2 from "../../Assets/slider2.jpg";
import slider3 from "../../Assets/slider3.jpg";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="h-2/5 w-full ">
      <Slider {...settings}>
        <div>
          <img src={slider1} alt="Carousel " />
        </div>
        <div>
          <img src={slider2} alt="Carousel " />
        </div>
        <div>
          <img src={slider3} alt="Carousel " />
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;

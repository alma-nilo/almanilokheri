import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css"; // import your custom CSS file here

import slider1 from "../../Assets/slider1.jpg";
import slider2 from "../../Assets/slider2.jpg";
import slider3 from "../../Assets/slider3.jpg";
import slider4 from "../../Assets/AdminiStrative.jpeg";
import slider5 from "../../Assets/main.jpeg";

import { css } from "@emotion/react";
import { Link } from "react-router-dom";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    pauseOnHover: true,
    // arrows: true,
    // draggable: true,
  };

  return (
    <>
      <div className="h-2/5 w-full">
        <Slider {...settings}>
          <div className="relative ">
            <img src={slider1} alt="Carousel " />
            <div className="absolute z-50 backdrop-blur-[3px] hidden sm:flex  flex-col md:flex-col lg:w-1/2 md:w-1/2 w-full md:mt-10 md:h-5/6 h-full top-0 right-0 left-0 bottom-0 items-center justify-center">
              <h4 className="text-xl md:pl-10 md:text-center md:text-2xl lg:text-3xl font-bold h-fit text-pretty text-white">
                Welcome To GBN Govt. polytechnic Nilokheri Alumni Association{" "}
              </h4>
              <br />
              <span className="lg:text-lg backdrop-blur-[3px] w-full text-slate-100 font-medium md:text-balance text-center text-base">
                A registered body of the Alumni members of the GBN Govt.
                polytechnic Nilokheri, where you to connect with fellow members.
              </span>
              <Link
                to="/signup"
                className="w-1/2 text-center text-white mt-5 hit-fit px-2 py-1 rounded-md text-base bg-green-500 hover:bg-emerald-500 transition-colors duration-200 ease-linear"
              >
                Join Us
              </Link>
            </div>
          </div>{" "}
          <div className="relative ">
            <img src={slider2} alt="Carousel " />
            <div className="absolute z-50 backdrop-blur-[3px] hidden sm:flex  flex-col md:flex-col lg:w-1/2 md:w-1/2 w-full md:mt-10 md:h-5/6 h-full top-0 right-0 left-0 bottom-0 items-center justify-center">
              <h4 className="text-xl md:pl-10  md:text-2xl lg:text-3xl font-bold h-fit text-pretty  text-white">
                Welcome To GBN Govt. polytechnic Nilokheri Alumni Association{" "}
              </h4>
              <br />
              <span className="lg:text-lg backdrop-blur-sm w-full text-slate-100 font-medium text-balance text-center text-base">
                A registered body of the Alumni members of the GBN Govt.
                polytechnic Nilokheri, where you to connect with fellow members.
              </span>
              <Link
                to="/signup"
                className="w-1/2 text-center text-white mt-5 hit-fit px-2 py-1 rounded-md text-base bg-green-500 hover:bg-emerald-500 transition-colors duration-200 ease-linear"
              >
                Join Us
              </Link>
            </div>
          </div>{" "}
          <div className="relative ">
            <img src={slider3} alt="Carousel " />
            <div className="absolute z-50 backdrop-blur-[3px] hidden sm:flex  flex-col md:flex-col lg:w-1/2 md:w-1/2 w-full md:mt-10 md:h-5/6 h-full top-0 right-0 left-0 bottom-0 items-center justify-center">
              <h4 className="text-xl md:pl-10  md:text-2xl lg:text-3xl font-bold h-fit md:text-pretty text-white">
                Welcome To GBN Govt. polytechnic Nilokheri Alumni Association{" "}
              </h4>
              <br />
              <span className="lg:text-lg backdrop-blur-sm w-full text-slate-100 font-medium text-balance text-center text-base">
                A registered body of the Alumni members of the GBN Govt.
                polytechnic Nilokheri, where you to connect with fellow members.
              </span>
              <Link
                to="/signup"
                className="w-1/2 text-center text-white mt-5 hit-fit px-2 py-1 rounded-md text-base bg-green-500 hover:bg-emerald-500 transition-colors duration-200 ease-linear"
              >
                Join Us
              </Link>
            </div>
          </div>{" "}
        </Slider>
      </div>
    </>
  );
};

export default Carousel;

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css"; // import your custom CSS file here

import { motion } from "framer-motion"; // Import Framer Motion

import slider1 from "../../Assets/slider1.jpg";
import slider2 from "../../Assets/slider2.jpg";
import slider3 from "../../Assets/slider3.jpg";
import { Link } from "react-router-dom";
import { AuthApi } from "../../context/user";

const Carousel = () => {
  const { user } = AuthApi();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "ease-in-out",
  };

  return (
    <>
      <div className="h-2/5 w-full">
        <Slider {...settings}>
          {[slider1, slider2, slider3].map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }} // Slide-in animation
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative"
            >
              <img src={image} alt="Carousel" className="w-full" />
              <div className="absolute z-50 backdrop-blur-[5px] hidden sm:flex flex-col lg:w-1/2 md:w-1/2 w-full md:mt-10 md:h-5/6 h-full top-0 right-0 left-0 bottom-0 items-center justify-center">
                <motion.h4
                  whileHover={{ scale: 1.05 }} // Scale effect on hover
                  transition={{ duration: 0.3 }}
                  className="text-xl md:pl-10 md:text-center md:text-2xl lg:text-3xl font-bold text-white"
                >
                  {index === 0
                    ? "Welcome To GBN Govt. polytechnic Nilokheri Alumni Association"
                    : index === 1
                    ? "Where Memories Meet Masterpieces: Alumni Gallery Visit"
                    : "Reach Out to Us/ Stay Connected"}
                </motion.h4>
                <br />
                <span className="lg:text-lg backdrop-blur-sm w-full mb-2 text-white/90 font-medium md:text-balance text-center text-lg">
                  {index === 0
                    ? "A registered body of the Alumni members of GBN Govt. Polytechnic Nilokheri, where you connect with fellow classmates."
                    : index === 1
                    ? "Our alumni gallery visit is the perfect opportunity to catch up with friends and explore new exhibits."
                    : "We're always eager to hear from our alumni and learn about the amazing things you're doing. Whether you have a question, a suggestion, or just want to reconnect, we're here to listen."}
                </span>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    to={
                      index === 0
                        ? `${user ? "/alumni" : "/signup"}`
                        : index === 1
                        ? "/gallery"
                        : "/contactUs"
                    }
                    className={`w-1/2 text-center text-white mt-5 hit-fit px-3 py-2 rounded-md text-base transition-colors duration-200 ease-linear ${
                      index === 0
                        ? "bg-green-500 hover:bg-emerald-500"
                        : index === 1
                        ? "bg-yellow-500 hover:bg-orange-500"
                        : "bg-teal-500 hover:bg-cyan-500"
                    }`}
                  >
                    {index === 0
                      ? user
                        ? "Go to Profile"
                        : "Join Us"
                      : index === 1
                      ? "Go To Gallery"
                      : "Contact Us"}
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default Carousel;

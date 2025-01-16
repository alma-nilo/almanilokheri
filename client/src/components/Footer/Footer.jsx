import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../Assets/Logo.jpeg";
import VideoPlayer from "../VideoPlayer";

export default function Footer() {
  return (
    <div>
      <footer id="footer" className="bg-green-200 text-black">
        <div className="mt-5 z-0 p-0.5 w-11/12 mx-auto max-h-fit   flex items-center flex-col justify-center sm:border-0 border border-green-500  relative  bg-gradient-to-r from-green-200 to-green-200 via-emerald-100 ">
          <VideoPlayer />
        </div>
        <div className="p-8 flex sm:justify-between justify-center items-center">
          <div className="hidden sm:block">
            <div className="flex flex-col sm:flex-row items-center">
              <div className="w-40 h-28 mx-3 ">
                <iframe
                  width="160"
                  height="120"
                  frameBorder="0"
                  marginHeight="0"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3460.937795926304!2d76.93338881448668!3d29.8372172352884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390e699a4b3bba7b%3A0x908b6021984bb040!2sGovt.%20Engineering%20College!5e0!3m2!1sen!2sin!4v1672761455392!5m2!1sen!2sin"
                  marginWidth="0"
                ></iframe>
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center mb-4">
                  <img
                    className="w-6 h-6 mr-2"
                    src="https://cmsredesign.channeli.in/library/assets/icons/location.svg"
                    alt="location"
                  />
                  <a
                    className="underline"
                    href="http://gpnilokheri.ac.in/LocationMap.aspx"
                  >
                    How to reach GBN Polytechnic
                  </a>
                </div>
                <div className="flex items-center mb-4">
                  <img
                    className="w-6 h-6 mr-2"
                    src="https://cmsredesign.channeli.in/library/assets/icons/phone.svg"
                    alt="phone"
                  />
                  <a className="underline" href="tel:+911332285311">
                    +91-1745-246002
                  </a>
                </div>
                <div className="flex items-center">
                  <img
                    className="w-6 h-6 mr-2"
                    src="https://cmsredesign.channeli.in/library/assets/icons/email.svg"
                    alt="email"
                  />
                  <a
                    className="underline"
                    href="mailto:gbn.alumni.nilokheri@gmail.com"
                  >
                    gbn.alumni.nilokheri@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          <Link
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            to="/devloper"
          >
            <div className="flex flex-col   mx-5 items-center ">
              <div className="w-40 h-28 mb-4">
                <img
                  src={Logo}
                  alt="gbn"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-center mb-2">
                Create with ❤️ by:
                <br />
                Vishal Munday (CSE)
              </div>
              <p className="text-blue-500">Meet the developer</p>
            </div>
          </Link>
        </div>
        <div className="bg-gray-800 text-white h-12 flex justify-center items-center">
          <p>&copy;2022 Govt Polytechnic Nilokheri. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

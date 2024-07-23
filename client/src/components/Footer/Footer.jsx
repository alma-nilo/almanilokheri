import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../Assets/Logo.jpeg";

export default function Footer() {
  return (
    <div>
      <footer id="footer" class="bg-green-200 text-black">
        <div class="p-8 flex sm:justify-between justify-center items-center">
          <div class="hidden sm:block">
            <div class="flex flex-col sm:flex-row items-center">
              <div class="w-40 h-28 mx-3 ">
                <iframe
                  width="160"
                  height="120"
                  frameborder="0"
                  marginheight="0"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3460.937795926304!2d76.93338881448668!3d29.8372172352884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390e699a4b3bba7b%3A0x908b6021984bb040!2sGovt.%20Engineering%20College!5e0!3m2!1sen!2sin!4v1672761455392!5m2!1sen!2sin"
                  marginwidth="0"
                ></iframe>
              </div>
              <div class="flex flex-col justify-center">
                <div class="flex items-center mb-4">
                  <img
                    class="w-6 h-6 mr-2"
                    src="https://cmsredesign.channeli.in/library/assets/icons/location.svg"
                    alt="location"
                  />
                  <a
                    class="underline"
                    href="http://gpnilokheri.ac.in/LocationMap.aspx"
                  >
                    How to reach GBN Polytechnic
                  </a>
                </div>
                <div class="flex items-center mb-4">
                  <img
                    class="w-6 h-6 mr-2"
                    src="https://cmsredesign.channeli.in/library/assets/icons/phone.svg"
                    alt="phone"
                  />
                  <a class="underline" href="tel:+911332285311">
                    +91-1745-246002
                  </a>
                </div>
                <div class="flex items-center">
                  <img
                    class="w-6 h-6 mr-2"
                    src="https://cmsredesign.channeli.in/library/assets/icons/email.svg"
                    alt="email"
                  />
                  <a
                    class="underline"
                    href="mailto:gbn.alumni.nilokheri@gmail.com"
                  >
                    gpnilokheri@hry.nic.in
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
            <div class="flex flex-col   mx-5 items-center ">
              <div class="w-40 h-28 mb-4">
                <img
                  src={Logo}
                  alt="gbn"
                  class="w-full h-full object-contain"
                />
              </div>
              <div class="text-center mb-2">
                Create with ❤️ by:
                <br />
                Vishal Munday (CSE)
              </div>
              <p className="text-blue-500">Meet the developer</p>
            </div>
          </Link>
        </div>
        <div class="bg-gray-800 text-white h-12 flex justify-center items-center">
          <p>&copy;2022 Govt Polytechnic Nilokheri. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

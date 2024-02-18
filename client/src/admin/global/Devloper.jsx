import React, { useState } from "react";
import { FaGithub, FaInstagram, FaLinkedin, FaEnvelope } from "react-icons/fa";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";

import Logo from "../../Assets/Logo.jpeg";
import { AuthApi } from "../../context/user";
import Navbar from "../../components/Navbar";

const MeetTheDeveloper = () => {
  const [navbar, setNavbar] = useState(false);
  const navigate = useNavigate();

  const { user } = AuthApi();
  return (
    <>
      <div className=" bg-slate-200 ">
        {/* content  */}

        <Navbar developer={true} />

        {/* content  */}

        <div className="bg-green-400 py-6">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="flex justify-center">
              <h1 className="text-2xl lg:text-4xl text-white font-bold mb-6">
                Developer
              </h1>
            </div>

            <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between">
              <div className="lg:w-2/5 flex justify-center items-center flex-col mb-6 lg:mb-0">
                <img
                  src="https://raw.githubusercontent.com/vishu7im/personal-asset/vishal/vishal.jpeg"
                  className="rounded-full w-72 h-72 object-cover object-center border-4 border-white"
                />

                <h1 className="text-2xl lg:text-4xl text-white font-semibold my-6">
                  Vishal Munday
                </h1>
                <div className="flex justify-center mt-4 space-x-8">
                  <a
                    href="https://www.linkedin.com/in/vishal-munday-869024223/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gray-200"
                  >
                    <span className="sr-only">LinkedIn</span>
                    <FaLinkedin className="text-4xl" />
                  </a>
                  <a
                    href="mailto:vishu.im.0007@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gray-200"
                  >
                    <span className="sr-only">Mail</span>
                    <FaEnvelope className="text-4xl" />
                  </a>
                  <a
                    href="https://github.com/vishu7im/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gray-200"
                  >
                    <span className="sr-only">GitHub</span>
                    <FaGithub className="text-4xl" />
                  </a>
                  <a
                    href="https://www.instagram.com/_vi.shu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gray-200"
                  >
                    <span className="sr-only">Twitter</span>
                    <FaInstagram className="text-4xl" />
                  </a>
                </div>
              </div>
              <div className="lg:w-3/5 text-white">
                <p className="text-xl lg:text-2xl mb-4">
                  Hi there! My name is Vishal, <br />
                  <p className="mb-4">
                    Computer Engg "2021-2024" , 210090800122
                  </p>
                  and I'm the developer behind this website. I'm a passionate
                  web developer with experience in the MERN stack, as well as
                  other web development technologies.
                </p>
                <p className="text-xl lg:text-2xl mb-4">
                  I created this website as a project to showcase my skills and
                  provide a platform for alumni of GBN Govt Polytechnic
                  Nilokheri to connect and stay in touch with each other.
                </p>
                <p className="text-xl lg:text-2xl">
                  If you have any feedback, suggestions, or just want to say hi,
                  feel free to reach out to me using the contact form on the{" "}
                  <a href="/contactus" className="underline">
                    Contact Us page
                  </a>{" "}
                  of this website. I'm always happy to hear from fellow
                  developers and members of the alumni community.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* content  */}
      </div>
    </>
  );
};

export default MeetTheDeveloper;

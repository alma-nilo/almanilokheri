import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaLinkedin, FaFacebook, FaTwitter, FaEnvelope } from "react-icons/fa";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import Posts from "../widgets/Post";
import { AuthApi } from "../context/user";

import FloatingLogoButton from "../components/LogoutBtn";

const Alumni = () => {
  const [user, setUser] = useState({});
  const [loader, setLoader] = useState(true);

  const User = AuthApi().user;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_KEY}/admins/getuser/${User.uuid}`
        );
        setLoader(false);
        setUser(response.data.data);
        //console.log(response.data.data);
      } catch (error) {
        // navigate("/signup");
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    };

    fetchUser();
  }, [User]);
  // console.log(User);

  if (loader) {
    return <Loader />;
  } else {
    return (
      <>
        <Navbar headerDash={true} />
        <div className="relative bg-green-200 py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-1 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-center">
                  <img
                    src={user.profile}
                    alt={`${user.name}'s Profile`}
                    className="w-32 h-32 rounded-full mx-auto"
                  />
                  <h2 className="text-3xl font-semibold mt-4">{user.name}</h2>
                </div>
                <div className="block">
                  <p className="text-gray-600 text-lg">
                    <span className="font-semibold text-green-400">
                      Roll No:
                    </span>{" "}
                    {user.rollNo}
                  </p>
                  <p className="text-gray-600 text-lg">
                    {" "}
                    <span className="font-semibold text-green-400">
                      Trade:
                    </span>{" "}
                    {user.Trade}
                  </p>
                  <p className="text-gray-600 text-lg">
                    <span className="font-semibold text-green-400">
                      Profession:
                    </span>
                    {user.profession}
                  </p>
                  <p className="text-gray-600 text-lg">
                    <span className="font-semibold text-green-400">Batch:</span>{" "}
                    {user.startYear}-{user.endYear}
                  </p>
                </div>

                <p className="text-gray-700 text-base mt-4">{user.about}</p>
              </div>
            </div>
            <div className="md:col-span-1 ">
              <Posts UserProfile={true} uuid={User.uuid} />
            </div>
          </div>
          <FloatingLogoButton />
        </div>
        <Footer />
      </>
    );
  }
};

export default Alumni;

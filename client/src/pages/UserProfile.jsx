import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaLinkedin, FaFacebook, FaTwitter, FaEnvelope } from "react-icons/fa";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import Posts from "../widgets/Post";

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [loader, setLoader] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_KEY}/admins/getuser/${id}`
        );
        setLoader(false);
        setUser(response.data.data);
        //console.log(response.data.data);
      } catch (error) {
        navigate("/");
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    };

    fetchUser();
  }, [id]);
  //console.log(user);

  if (loader) {
    return (
      <>
        <Navbar />
        <Loader />;
      </>
    );
  } else {
    return (
      <>
        <Navbar />
        <div className="bg-green-200 py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-center">
                  <img
                    src={user.profile}
                    alt={`${user.name}'s Profile`}
                    className="w-32 h-32 rounded-full mx-auto object-cover"
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
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Connect with me</h3>
                <div className="flex items-center space-x-4">
                  <a
                    href={user.linkdln}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-500 hover:text-green-700"
                  >
                    <FaLinkedin className="text-3xl" />
                  </a>
                  <a
                    href={`mailto:${user.email}`}
                    target="_blank"
                    className="text-green-500 hover:text-green-700"
                  >
                    <FaEnvelope className="text-3xl" />
                  </a>
                  <a
                    href={user.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-500 hover:text-green-700"
                  >
                    <FaTwitter className="text-3xl" />
                  </a>
                  <a
                    href={user.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-500 hover:text-green-700"
                  >
                    <FaFacebook className="text-3xl" />
                  </a>
                </div>
              </div>
              <div className="flex flex-col mt-3 items-center Userpost  space-y-4">
                <Posts UserProfile={true} uuid={id} />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
};

export default UserProfile;

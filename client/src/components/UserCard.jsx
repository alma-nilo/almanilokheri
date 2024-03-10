import React from "react";
import { FaLinkedin, FaFacebook, FaTwitter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserCard = ({ user }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-4 ">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg ">
        <div className="relative  pb-48 overflow-hidden">
          <img
            onClick={() => {
              navigate(`/user/${user?._id}`);
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className="absolute rounded-xl border  inset-0 h-full w-full object-contain "
            src={user?.profile}
            alt={user?.name}
          />
        </div>
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">{user?.name}</h2>
          <p className="text-gray-600 text-lg mb-4">{user?.profession}</p>
          <div
            onClick={() => {
              navigate(`/user/${user?._id}`);
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className="flex items-center mb-4"
          >
            <p className="text-green-600 font-bold mr-2">Batch:</p>
            <p className="text-gray-700">
              {user?.startYear + "-" + user?.endYear}
            </p>
          </div>
          <div
            onClick={() => {
              navigate(`/user/${user?._id}`);
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className="flex items-center mb-4"
          >
            <p className="text-green-600 font-bold mr-2">Roll No:</p>
            <p className="text-gray-700">{user?.rollNo}</p>
          </div>
          <div
            onClick={() => {
              navigate(`/user/${user?._id}`);
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className="flex items-center mb-4"
          >
            <p className="text-green-600 font-bold mr-2">Trade:</p>
            <p className="text-gray-700">{user?.Trade}</p>
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex">
              {
                <a
                  href={user?.linkdln}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-green-500 mr-4 transition-colors duration-200"
                >
                  <FaLinkedin size={28} />
                </a>
              }
              {
                <a
                  href={user?.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-green-500 mr-4 transition-colors duration-200"
                >
                  <FaFacebook size={28} />
                </a>
              }
              {
                <a
                  href={user?.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-green-500 transition-colors duration-200"
                >
                  <FaTwitter size={28} />
                </a>
              }
            </div>
            <button
              onClick={() => {
                navigate(`/user/${user?._id}`);
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Connect
            </button>
          </div>
          <hr className="border-t border-gray-400 my-4" />
          <p
            className="text-gray-700"
            onClick={() => {
              navigate(`/user/${user?._id}`);
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            {user?.about.slice(0, 30)}....{" "}
            <span
              onClick={() => {
                navigate(`/user/${user?._id}`);
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              className="text-green-600"
            >
              read more
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

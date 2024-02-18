import React from "react";
import { Email, LinkedIn, Facebook, Twitter } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
export default function Card({ element }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col hover:cursor-pointer mx-4 justify-center max-w-xs p-6 shadow-md rounded-xl sm:px-12 bg-green-300 dark:text-gray-100">
      <img
        onClick={() => {
          navigate(`/user/${element._id}`);
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
        src={element.profile}
        alt=""
        className="w-32 h-32 mx-auto rounded-full object-cover dark:bg-gray-500 aspect-square"
      />
      <div className="space-y-4 text-center divide-y divide-gray-700">
        <div
          onClick={() => {
            navigate(`/user/${element._id}`);
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
          className="my-2 space-y-1"
        >
          <h2
            onClick={() => {
              navigate(`/user/${element._id}`);
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className="text-xl font-semibold sm:text-2xl"
          >
            {element.name}
          </h2>
          <p
            onClick={() => {
              navigate(`/user/${element._id}`);
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className="px-5 text-xs sm:text-base dark:text-gray-400"
          >
            {element.rollNo}
          </p>
          <p
            onClick={() => {
              navigate(`/user/${element._id}`);
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className="px-5 text-xs sm:text-base dark:text-gray-400"
          >
            {element.startYear + "-" + element.endYear}
          </p>
          <p
            onClick={() => {
              navigate(`/user/${element._id}`);
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className="px-5 text-xs sm:text-base dark:text-gray-400"
          >
            {element.profession}
          </p>
        </div>
        <div className="flex justify-center pt-2 space-x-4 align-center">
          <Link
            onClick={() => {
              window.open(`mailto:${element.email}`);
            }}
            className="p-2 rounded-md dark:text-gray-100 hover:dark:text-violet-400"
          >
            <Email />
          </Link>
          <Link
            onClick={() => {
              window.open(`${element.linkdln}`);
            }}
            className="p-2 rounded-md dark:text-gray-100 hover:dark:text-violet-400"
          >
            <LinkedIn />
          </Link>
          <Link
            onClick={() => {
              window.open(`${element.facebook}`);
            }}
            className="p-2 rounded-md dark:text-gray-100 hover:dark:text-violet-400"
          >
            <Facebook />
          </Link>
          <Link
            onClick={() => {
              window.open(`${element.twitter}`);
            }}
            className="p-2 rounded-md dark:text-gray-100 hover:dark:text-violet-400"
          >
            <Twitter />
          </Link>
        </div>
      </div>
    </div>
  );
}

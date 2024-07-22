import React from "react";
import { Email, LinkedIn, Facebook, Twitter } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
export default function Card({ element }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center min-w-52 max-w-56 p-6 mx-4 bg-green-400 shadow-md hover:cursor-pointer rounded-xl sm:px-10 dark:text-gray-100">
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
        className="object-contain p-0 m-0 mx-auto shadow-sm rounded-3xl w-28 h-28 dark:bg-gray-500 sm:w-32 sm:h-32"
      />
      <div className="space-y-2 text-center divide-y divide-gray-700">
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
            className="text-base font-semibold sm:text-lg"
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
            className="px-5 text-xs sm:text-sm dark:text-gray-100"
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
            className="px-5 text-xs sm:text-sm dark:text-gray-100"
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
            className="px-5 text-xs sm:text-sm dark:text-gray-100"
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

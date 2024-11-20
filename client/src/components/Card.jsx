import { memo } from "react";
import { Email, LinkedIn, Facebook, Twitter } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

const Card = memo(({ element }) => {
  const navigate = useNavigate();
  // console.log(element);
  return (
<<<<<<< HEAD
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
=======
    <>
      <div className="flex sm:flex-row  flex-col justify-center min-w-max max-w-fit mx-4 bg-green-400 shadow-md hover:cursor-pointer rounded-xl sm:px-10 dark:text-gray-100">
        <div className="flex px-4  sm:py-2 py-6 justify-center items-center">
          {element.profile ? (
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
              className="object-cover p-0 m-0 mx-auto shadow-sm rounded-full w-32 h-32 dark:bg-gray-500 sm:w-32 sm:h-32"
            />
          ) : (
            <img
              src="https://static.vecteezy.com/system/resources/previews/036/280/651/non_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
              alt=""
              className="object-cover p-0 m-0 mx-auto shadow-sm rounded-full w-28 h-28 dark:bg-gray-500 sm:w-32 sm:h-32"
            />
          )}
>>>>>>> 4a8bf24a3b90409e4daf98e707d20f764f624c52
        </div>
        <div className="flex px-4 py-2 justify-center items-center">
          <div className="space-y-2 sm:text-start text-center divide-y divide-gray-700">
            <div
              onClick={() => {
                navigate(`/user/${element._id}`);
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              className="my-2 px-5 space-y-1"
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
                className="text-xs sm:text-sm dark:text-gray-100"
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
                className="text-xs sm:text-sm dark:text-gray-100"
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
                className="text-xs sm:w-full  overflow-hidden sm:text-sm dark:text-gray-100"
              >
                {element.profession?.length > 20
                  ? element.profession.slice(0, 20) + "..."
                  : element.profession}
                {/* {element.profession} */}
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
      </div>
    </>
  );
});
export default Card;

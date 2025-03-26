import { memo } from "react";
import { Email, LinkedIn, Facebook, Twitter } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion

const Card = memo(({ element }) => {
  const navigate = useNavigate();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }} // Initial state
        whileInView={{ opacity: 1, scale: 1 }} // Re-animates every time it comes into view
        viewport={{ once: false, amount: 0.3 }} // Controls when animation triggers
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{ scale: 1.03 }} // Scale-up effect on hover
        className="flex sm:flex-row flex-col justify-center min-w-max max-w-fit mx-4 bg-green-400 shadow-md hover:cursor-pointer rounded-xl sm:px-10 dark:text-gray-100"
      >
        <div className="flex px-4 sm:py-2 py-6 justify-center items-center">
          <motion.img
            whileHover={{ opacity: 1.0, scale: 1.05 }} // Slight pop-up on hover
            transition={{ duration: 0.3 }}
            onClick={() => {
              navigate(`/user/${element._id}`);
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            src={
              element.profile ??
              "https://cdn.pixabay.com/photo/2016/11/08/15/21/user-1808597_640.png"
            }
            alt=""
            className="object-cover p-0 m-0 mx-auto shadow-sm rounded-full w-32 h-32 dark:bg-gray-500 sm:w-32 sm:h-32 opacity-80 border-2 border-green-600"
          />
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
              <motion.h2
                whileHover={{ scale: 1.1 }} // Title scales up on hover
                transition={{ duration: 0.2 }}
                className="text-base font-semibold sm:text-lg"
              >
                {element.name}
              </motion.h2>
              <p className="text-xs sm:text-sm dark:text-gray-100">
                {element.rollNo}
              </p>
              <p className="text-xs sm:text-sm dark:text-gray-100">
                {element.startYear + "-" + element.endYear}
              </p>
              <p className="text-xs sm:w-full overflow-hidden sm:text-sm dark:text-gray-100">
                {element.profession?.length > 20
                  ? element.profession.slice(0, 20) + "..."
                  : element.profession}
              </p>
            </div>
            <div className="flex justify-center pt-2 space-x-4 align-center">
              {/* Social Icons with Hover Effect */}
              {[
                { icon: <Email />, url: `mailto:${element.email}` },
                { icon: <LinkedIn />, url: element.linkdln },
                { icon: <Facebook />, url: element.facebook },
                { icon: <Twitter />, url: element.twitter },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.2, rotate: 5 }} // Small rotation on hover
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    onClick={() => window.open(item.url)}
                    className="p-2 rounded-md dark:text-gray-100 hover:dark:text-violet-400"
                  >
                    {item.icon}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
});

export default Card;

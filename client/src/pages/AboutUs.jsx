import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer/Footer";
import { Link } from "react-router-dom";

export default function AboutUs() {
  return (
    <>
      <div className=" bg-slate-200 ">
        <Navbar />

        {/* content  */}

        <div className="flex flex-col p-6 items-center justify-center min-h-screen bg-gray-100">
          <div className="max-w-4xl mx-auto px-8 py-16 bg-white shadow-lg rounded-lg">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
              About Us
            </h1>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              As an alumni of Guru BrahmaNand Ji Govt. Polytechnic Nilokheri,
              you are a part of a legacy that spans over several decades. The
              college has produced numerous successful professionals in the
              field of engineering, and our alumni are a testament to the
              quality of education we provide.
            </p>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              The college is now proud to have an Alumni Association, aimed at
              fostering a strong bond between the alumni and the institution.
              Our goal is to create a platform where alumni can connect with
              each other and with the college, share their experiences, and
              contribute to the growth of the institution.
            </p>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Through the alumni association, we aim to organize events and
              activities that bring alumni together and help them reconnect with
              the college. These events may include networking sessions, talks
              by industry experts, and social gatherings. We believe that this
              will not only help alumni stay connected to each other, but also
              enable them to give back to the college and help the next
              generation of students.
            </p>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              We invite all alumni to become members of the association and take
              an active part in its activities. By doing so, you will not only
              be reconnecting with old friends and colleagues, but also helping
              to shape the future of the college and its students.
            </p>
            <Link
              to="/signup"
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              className="bg-green-500 text-white rounded-md py-3 px-8 hover:bg-green-600 transition-colors duration-300 ease-in-out"
            >
              Become a Member
            </Link>
          </div>
        </div>
        {/* content  */}
      </div>
      <Footer />
    </>
  );
}

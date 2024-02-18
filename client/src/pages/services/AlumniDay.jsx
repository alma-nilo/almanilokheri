import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer/Footer";

const AlumniDayPage = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-semibold mb-4">
          Alumni Day (Gold/Silver)
        </h1>
        <p className="text-gray-600 mb-8">
          Join us for the special Alumni Day celebration, where we honor our
          distinguished Gold and Silver alumni. It's a day filled with memories,
          recognition, and camaraderie.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Gold Alumni
            </h3>
            <p className="text-gray-600 mb-4">
              Our Gold Alumni have contributed significantly to their fields and
              community. Join us in recognizing their outstanding achievements.
            </p>
            <button className="bg-gold text-white px-4 py-2 rounded-full">
              RSVP for Gold Alumni
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Silver Alumni
            </h3>
            <p className="text-gray-600 mb-4">
              Celebrate the accomplishments of our Silver Alumni, who continue
              to excel in their careers and make a positive impact.
            </p>
            <button className="bg-silver text-white px-4 py-2 rounded-full">
              RSVP for Silver Alumni
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AlumniDayPage;

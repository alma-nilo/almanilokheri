import React from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar";
import { AlertApi } from "../../context/AlertContext";

const VolunteerPage = () => {
  const { setAlert } = AlertApi();
  const handleVolunteer = () => {
    setAlert({
      type: "success",
      message: "Thank you for volunteering! We will be in touch",
    });
    // Logic to handle volunteer sign-up
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mb-4 mt-8">
        <h1 className="text-3xl font-semibold mb-4">Volunteer Opportunities</h1>
        <p className="text-gray-600 mb-8">
          Join us in making a difference! Explore the various volunteer
          opportunities below and sign up to be part of our team.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Event Support</h2>
            <p className="text-gray-600">
              Help organize and execute exciting events for our community.
            </p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-full mt-4"
              onClick={handleVolunteer}
            >
              Volunteer Now
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Community Outreach</h2>
            <p className="text-gray-600">
              Engage with the community and promote our initiatives.
            </p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-full mt-4"
              onClick={handleVolunteer}
            >
              Volunteer Now
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Tech Support</h2>
            <p className="text-gray-600">
              Assist with technical aspects and support our online presence.
            </p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-full mt-4"
              onClick={handleVolunteer}
            >
              Volunteer Now
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VolunteerPage;

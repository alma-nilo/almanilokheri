import React from "react";
import { AlertApi } from "../../context/AlertContext";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar";

const JobOpportunitiesPage = () => {
  const { setAlert } = AlertApi();
  const handleApplyNow = () => {
    setAlert({
      type: "success",
      message: "Thank you for applying! We will review your application.",
    });
    // Logic to handle volunteer sign-up
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-semibold mb-4">Job Opportunities</h1>
        <p className="text-gray-600 mb-8">
          Explore exciting career opportunities with us. Browse the available
          positions below and apply now.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Software Engineer</h2>
            <p className="text-gray-600">
              Join our dynamic tech team to develop innovative software
              solutions.
            </p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-full mt-4"
              onClick={handleApplyNow}
            >
              Apply Now
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Marketing Specialist</h2>
            <p className="text-gray-600">
              Drive marketing initiatives and contribute to our brand growth.
            </p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-full mt-4"
              onClick={handleApplyNow}
            >
              Apply Now
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              Customer Support Representative
            </h2>
            <p className="text-gray-600">
              Provide excellent customer service and assist with inquiries.
            </p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-full mt-4"
              onClick={handleApplyNow}
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default JobOpportunitiesPage;

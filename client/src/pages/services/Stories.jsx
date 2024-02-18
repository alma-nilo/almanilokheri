import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer/Footer";

const SuccessStoriesPage = () => {
  const successStories = [
    {
      id: 1,
      name: "Rakesh Kumar Bansal",
      Batch: "1975 - 1978",
      image: "/Rakesh_Bansal.png",
      achievement: "Chief Executive Officer (CEO)",
      details: `Born & Brought up at Samana, District Patiala, Punjab
      Completed Schooling from Punjab 
      Diploma in Electronics & Communication from Haryana Polytechnic, Nilokheri in 1978 (Gold Medalist)
      Got placed in M/s Televista (Television Manufacturing Company) in 1978 as an Apprentice with renumeration of Rs.300 per Month. 
      Joined M/s APLAB (UPS Manufacturing Company) in 1980 and was there in different roles till 1988 
      Left APLAB in 1989 to Start Uniline Energy Systems Pvt. Ltd. (Formerly KLA Electronics Pvt. Ltd.) 
      Uniline was initially started as a trading company and later on diversified & upscaled to a UPS Manufacturing Company`,
    },
    {
      id: 2,
      name: "Arun Goyal",
      Batch: "1984 - 1987",
      image: "/Arun_Goyal.png",
      achievement: "Chief Executive Officer (CEO)",
      details: `10th class with flying colors in 1982 from SMB School, Kurukshetra.
      Diploma in Mechanical Engineering from Haryana Polytechnic, Nilokheri in 1987.
     Joined Yeshwantrao Chavan College of Engineering (YCCE), Nagpur, to study Production Engineering in 1989 but left the college after spending 2 years.`,
    },
    {
      id: 3,
      name: "Susheet Sethi",
      Batch: "1987 - 1980",
      image: "/Susheet_Sethi.png",
      achievement: "Chief Executive Officer (CEO)",
      details: `Yamazuki Denki
      Manufactures of all types of Power Distribution, Machine Control Panel, Types of SPM Machines Panel
      
       A TRUSTED AND PREFERED BRAND FOR  LV & MV  PANELS 
      INNOVATIVE IDEA &ENERGY CONSERVATION 
      We design the electrical panel as per  costumer requirement –Relay logic , CNC , PLC
      
      
       Plot no. 168  ( Huda ) HSIIDC, Sector 59, Faridabad-121004. `,
    },
    // Add more success stories as needed
  ];

  const [expandedStoryId, setExpandedStoryId] = useState(null);

  const handleToggleDetails = (id) => {
    setExpandedStoryId((prevId) => (prevId === id ? null : id));
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-semibold mb-4">Success Stories</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {successStories.map((story) => (
            <div key={story.id} className="bg-white p-6 rounded-lg shadow-md">
              <img
                src={story.image}
                alt={story.name}
                className="w-full h-64 object-contain mb-4 rounded"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {story.name}
              </h3>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                {story.Batch}
              </h4>
              <p className="text-gray-600 mb-4">{story.achievement}</p>
              {expandedStoryId === story.id ? (
                <div>
                  <p className="text-gray-600 mb-4">{story.details}</p>
                  <button
                    onClick={() => handleToggleDetails(story.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-full"
                  >
                    Read Less
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleToggleDetails(story.id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-full"
                >
                  Read More
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SuccessStoriesPage;

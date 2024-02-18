import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer/Footer";

const IDCardPage = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-12">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Institute ID Card
            </h2>
            <p className="text-gray-600  font-semibold mb-2">
              The Institute ID Card serves as a secure identification and access
              credential for Alumni. Featuring a unique design, it facilitates
              seamless entry to campus facilities and resources. Obtain your ID
              Card to enjoy the convenience and privileges it
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            <div className="text-center">
              <img
                src="/idcard1.jpeg"
                alt="ID Card Front"
                className="w-full h-64 object-fit mb-4 rounded-md"
              />
            </div>
            <div className="text-center">
              <img
                src="/idcard2.jpeg"
                alt="ID Card Back"
                className="w-full h-64 object-fit mb-4 rounded-md"
              />
            </div>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() =>
                window.open(
                  "https://www.onlinesbi.sbi/sbicollect/icollecthome.htm?corpID=4592373",
                  "_blank"
                )
              }
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full"
            >
              Avail Now
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default IDCardPage;

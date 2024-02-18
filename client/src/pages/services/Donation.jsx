import React from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar";

const DonationPage = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-12">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold text-gray-800">
              Support Education, Empower Lives
            </h2>
            <p className="text-gray-600">
              Your generous donation contributes to the growth and development
              of our institution. Join hands with us to empower students and
              foster academic excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="text-center">
              <img
                src="/giveaway.png"
                alt="Donation Image 1"
                className="w-full h-64 object-contain mb-4 rounded-md"
                onClick={() =>
                  window.open(
                    "https://www.onlinesbi.sbi/sbicollect/icollecthome.htm?corpID=4592373",
                    "_blank"
                  )
                }
              />
            </div>
            <div className="text-center">
              <img
                src="/qrcode.png"
                alt="Donation Image 2"
                className="w-full h-64 object-contain mb-4 rounded-md"
              />
            </div>
          </div>

          <div className="mt-8">
            <p className="text-gray-600">
              Your contribution supports scholarships, infrastructure
              development, and educational initiatives. Every donation, big or
              small, makes a difference in shaping the future of aspiring
              students.
            </p>
            <p className="text-gray-600">
              We thank you for your philanthropic spirit and commitment to
              education. Your gift helps create a positive impact on the lives
              of countless individuals.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DonationPage;

import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer/Footer";

const AcademicFacility = () => {
  return (
    <>
      <Navbar />
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto">
          <div className="text-center">
            <h2 className=" text-3xl md:text-5xl font-bold text-gray-800 mb-6">
              Institute Facility for Alumni
            </h2>
            <p className="text-gray-600 text-2xl semi-bold">
              Explore the various academic facilities offered by our institute
              to support and engage alumni in their educational journey.
            </p>
          </div>

          {/* Guest Room Section */}

          <div className="mt-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Guest Room
            </h3>
            <p className="text-gray-600  font-semibold mb-4 ">
              In our endeavor to provide comprehensive academic facilities for
              alumni, our institute takes pride in offering a comfortable and
              well-equipped Guest Room. Designed with your comfort in mind, our
              guest accommodations aim to create a welcoming environment for
              alumni visiting the campus. Whether attending events, workshops,
              or seeking a temporary stay, our Guest Room ensures a pleasant
              experience. These thoughtfully furnished rooms are tailored to
              meet the diverse needs of our alumni, featuring amenities that
              prioritize convenience and relaxation. From cozy furnishings to
              modern conveniences, our Guest Room provides a home-like
              atmosphere during your stay. The tranquil surroundings and
              attention to detail make it an ideal space for alumni to reconnect
              with the institute, fostering a sense of belonging.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
              {[1, 2].map((index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
                >
                  <img
                    src={`${process.env.REACT_APP_API_KEY}/guest${index}.jpeg`}
                    alt={`guest ${index}`}
                    className="w-full h-96 object-cover mb-4 rounded"
                  />
                  <div className="text-center mt-4">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full">
                      Avail Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Library Section */}
          <div className="mt-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Library</h3>
            <p className="text-gray-600 font-semibold mb-4 ">
              Our state-of-the-art library is equipped with over 50,000 books,
              digital resources, and provides a conducive environment for
              research and learning. The library is well classified and stocked
              with around one lac volumes, 19 journals/magazines and all
              prominent newspapers are regularly subscribed to supplement the
              knowledge of the student. It has a approx. 1000 sq.mtrs. of
              built-up area comprising of a reading room with sitting capacity
              of 150. The library has a Book Bank, which provide all the
              students with textbooks for almost all the subjects for complete
              course duration.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
              {[1, 2].map((index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
                >
                  <img
                    src={`${process.env.REACT_APP_API_KEY}/library${index}.jpeg`}
                    alt={`Library ${index}`}
                    className="w-full h-96 object-cover mb-4 rounded"
                  />
                  <div className="text-center mt-4">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full">
                      Explore Library
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AcademicFacility;

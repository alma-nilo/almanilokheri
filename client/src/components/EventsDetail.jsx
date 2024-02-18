import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
import { FiCalendar } from "react-icons/fi";
import Navbar from "./Navbar";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState({});

  const fetchEvents = async () => {
    // Handle the form submission here

    const url = `${process.env.REACT_APP_API_KEY}/admins/event/${id}`;

    try {
      const res = await axios.get(url);

      setEvent(res.data.data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchEvents();
  }, []);

  if (!event) {
    return <Loader />;
  }

  return (
    <>
      <div className=" bg-slate-200 ">
        <Navbar />
        <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
          <div className="flex items-center mb-8">
            <div className="w-20 h-20 flex-shrink-0 rounded-full bg-green-500 text-white flex items-center justify-center text-5xl">
              <FiCalendar />
            </div>
            <h2 className="text-4xl font-bold text-green-600 ml-6">
              {event.title}
            </h2>
          </div>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
            <div className="flex items-center mb-4 md:mb-0">
              <p className="text-gray-600 text-lg mr-4">{event.date}</p>
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 fill-current text-gray-500 mr-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5zm0 4.5c-2.67 0-8 1.34-8 4v1h16v-1c0-2.66-5.33-4-8-4z"></path>
                </svg>
                <p className="text-gray-600 text-lg">{event.location}</p>
              </div>
            </div>
            <a
              href="/"
              className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition-colors duration-300"
            >
              Register
            </a>
          </div>
          <p className="text-gray-800 text-lg leading-7">{event.description}</p>
        </div>
      </div>
    </>
  );
};

export default EventDetails;

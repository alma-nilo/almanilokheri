import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NewsBox = () => {
  const [newsItems, setNews] = useState([]);
  const navigate = useNavigate();

  const fetchNews = async () => {
    // Handle the form submission here

    const url = `${process.env.REACT_APP_API_KEY}/admins/news/home`;

    try {
      const res = await axios.get(url);

      setNews(res.data.data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchNews();
  }, []);

  // CSS for blinking effect
  const blinkingTagStyle = `
    @keyframes blink {
      0% {
        background-color: #ff0000;
        transform: scale(1);
      }
      25% {
        background-color: #0bff89;
        transform: scale(1.2);
      }
      50% {
        background-color: #2cff0b;
        transform: scale(1);
      }
      75% {
        background-color: #0b30ff;
        transform: scale(1.2);
      }
      100% {
        background-color: #ff00e6;
        transform: scale(1);
      }
    }
    
    .blinking-tag {
      animation: blink 1s infinite;
      position: absolute;
      top: 25px;
      right: 5px;
      padding: 0px 5px;
      color: white;
      font-weight: bold;
      border-radius: 4px;
    }
  `;

  const [scrollDirection, setScrollDirection] = useState(1);

  // Ref to the news container element
  const newsContainerRef = useRef(null);
  const scrollIntervalRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  // Function to handle automatic scrolling
  const handleAutoScroll = () => {
    if (!newsContainerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = newsContainerRef.current;

    // Check if the container has reached the bottom or top
    if (
      (scrollDirection === 1 && scrollTop + clientHeight >= scrollHeight) ||
      (scrollDirection === -1 && scrollTop === 0)
    ) {
      // Change the scrolling direction
      setScrollDirection((prevDirection) => -prevDirection);
    }

    // Perform the automatic scroll
    const scrollSpeed = 3000;
    newsContainerRef.current.scrollTop += scrollDirection * scrollSpeed;
  };

  // Effect to start and stop automatic scrolling
  useEffect(() => {
    // Helper function to start the automatic scrolling
    const startAutoScroll = () => {
      // Clear any existing interval
      stopAutoScroll();

      // Start the interval for automatic scrolling
      scrollIntervalRef.current = setInterval(handleAutoScroll, 2000); // Adjust the scrolling speed (milliseconds)
    };

    // Helper function to stop the automatic scrolling
    const stopAutoScroll = () => {
      clearInterval(scrollIntervalRef.current);
    };

    // Start automatic scrolling when the component mounts
    startAutoScroll();

    // Event handler for manual scrolling
    const handleManualScroll = () => {
      // Stop the automatic scrolling when the user starts scrolling manually
      stopAutoScroll();

      // Restart the automatic scrolling after a delay when the user stops scrolling
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(startAutoScroll, 1000); // Adjust the delay (milliseconds)
    };

    // Attach event listener for manual scrolling
    newsContainerRef.current.addEventListener("scroll", handleManualScroll);

    // Clean up event listener and interval when the component unmounts

    return () => {
      stopAutoScroll();
      clearTimeout(scrollTimeoutRef.current);
      // Use optional chaining operator (?) to prevent accessing properties of a null ref
      newsContainerRef.current?.removeEventListener(
        "scroll",
        handleManualScroll
      );
    };
  }, [scrollDirection]);

  return (
    <section className="w-full lg:w-1/2 bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Latest News</h2>
        <style>{blinkingTagStyle}</style>
        <div
          ref={newsContainerRef}
          className="h-80  hover:overflow-y-scroll"
          style={{ overflowY: "scroll" }}
        >
          {newsItems?.map((news) => {
            return (
              <div
                key={news._id}
                onClick={() => {
                  navigate("/news");
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
                className="mb-8 bg-slate-200 rounded-lg p-2 relative"
              >
                <div className="flex  items-center mb-2">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-green-500 mr-4">
                    <span className="text-white font-bold text-lg">
                      {news.date.split("-")[2]}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {news.title}.
                    </h3>
                    {/* The "New" tag with blinking effect */}
                    {news.newFlag && <span className="blinking-tag">New</span>}
                    <p className="text-gray-600 text-sm">{news.date}</p>
                  </div>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  {news.description.slice(0, 100)}...{" "}
                  <span className="text-lg text-red-700 leading-relaxed mb-4">
                    read more
                  </span>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const EventBox = () => {
  const [events, setevents] = useState([]);

  const navigate = useNavigate();

  const fetchEvents = async () => {
    // Handle the form submission here

    const url = `${process.env.REACT_APP_API_KEY}/admins/event`;

    try {
      const res = await axios.get(url);

      setevents(res.data.data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <section className="w-full lg:w-1/2 bg-green-400">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-white mb-4">Upcoming Events</h2>

        <div className="h-80 overflow-hidden hover:overflow-y-scroll">
          {events?.map((event) => (
            <div
              key={event._id}
              className={`flex items-center bg-white rounded-lg p-4 mb-4 `}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-200 mr-4">
                <span className="text-gray-600 font-bold text-lg">
                  {event.date.split("-")[2]}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {event.title}
                </h3>
                <p>
                  {event.description.slice(0, 100)}...{" "}
                  <span
                    className="text-green-600 cursor-pointer hover:text-green-300"
                    onClick={() => {
                      navigate(
                        `${process.env.REACT_APP_API_KEY}/events/${event._id}`
                      );
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    read more
                  </span>
                </p>

                <p className="text-gray-600 text-sm">{event.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function NewsAndEvent() {
  return (
    <div className="flex sm:flex-row flex-col">
      <NewsBox />
      <EventBox />
    </div>
  );
}

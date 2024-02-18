import { useState, useEffect } from "react";
import { FiAlertCircle } from "react-icons/fi";
import axios from "axios";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar";

const News = () => {
  const [news, setNews] = useState([]);
  const fetchNews = async () => {
    // Handle the form submission here

    const url = `${process.env.REACT_APP_API_KEY}/admins/news`;

    try {
      const res = await axios.get(url);

      setNews(res.data.data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchNews();
  }, []);

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
    right: 20px;
    padding: 0px 5px;
    color: white;
    font-weight: bold;
    border-radius: 4px;
  }
`;
  return (
    <>
      <div className=" bg-slate-200 ">
        <Navbar />

        {/* news   */}
        <style>{blinkingTagStyle}</style>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-3xl font-bold text-green-600 mb-6">
            Latest News
          </h2>
          {news?.map((item) => (
            <div key={item._id} className="mb-8 rounded relative">
              {item.newFlag && <span className="blinking-tag">New</span>}
              <div className="bg-gray-50 rounded-lg p-6 mb-6 flex items-center">
                <div className="w-12 h-12 flex-shrink-0 rounded-full bg-green-500 text-white flex items-center justify-center text-3xl">
                  <FiAlertCircle />
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">{item.date}</p>
                  <p className="text-gray-800 text-lg">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default News;

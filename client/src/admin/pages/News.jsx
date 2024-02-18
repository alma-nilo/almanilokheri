import React, { useEffect, useState } from "react";
import NewsForm from "../components/NewsUploadFrom";

import NewsView from "../components/NewsView";
import { AuthApi } from "../../context/user";
import axios from "axios";

const NewsPage = () => {
  const [newsList, setNewsList] = useState([]);
  const { admin } = AuthApi();

  const fetchNews = async () => {
    // Handle the form submission here

    const url = `${process.env.REACT_APP_API_KEY}/admins/news`;

    const config = {
      headers: {
        Authorization: `Bearer ${admin?.token}`,
      },
    };
    try {
      const res = await axios.get(url, config);

      setNewsList(res.data.data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchNews();
  }, [admin]);

  return (
    <div className={`min-h-screen  `}>
      <div className="container mx-auto p-8">
        <h1 className={` text-3xl text-gray-400 font-bold mb-4`}>
          News Upload
        </h1>
        <NewsForm fetchNews={fetchNews} />
      </div>
      <NewsView
        newsList={newsList}
        setNewsList={setNewsList}
        fetchNews={fetchNews}
      />
    </div>
  );
};

export default NewsPage;

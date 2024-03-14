import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer/Footer";
import axios from "axios";
import UserCard from "../components/UserCard";
import Loader from "../components/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import UserLoding from "../components/UserLoding";

export default function Member() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("all");
  const [selectedTrade, setSelectedTrade] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const loadMoreMember = async () => {
    try {
      // Fetch more posts from your API using Axios

      let url = `${process.env.REACT_APP_API_KEY}/admins/fetch?page=${page}`;

      // Add search parameters if available
      if (searchTerm) {
        url += `&searchName=${searchTerm}`;
      }

      if (selectedTrade) {
        url += `&searchTrade=${selectedTrade}`;
      }

      const response = await axios.get(url);
      const newData = response.data.data;
      // console.log(newData);
      // console.log(response);

      if (newData.length > 0) {
        setUsers((prevItems) => {
          const uniqueNewData = newData.filter((newItem) => {
            // Filter out items with duplicate _id from prevItems
            return !prevItems.some((prevItem) => prevItem._id === newItem._id);
          });

          // Concatenate uniqueNewData with prevItems
          return [...prevItems, ...uniqueNewData];
        });
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching more posts:", error);
    }
  };

  useEffect(() => {
    console.log("Search terms changed. Resetting page...");
    setUsers([]);
    setPage(1);
    // Introduce a delay of 1 second before fetching data
    const timeout = setTimeout(() => {
      loadMoreMember();
    }, 500);

    // Clear timeout to avoid multiple fetch calls
    return () => clearTimeout(timeout);
  }, [selectedBatch, selectedTrade, searchTerm]);

  const Tradearr = [
    "Computer Engineering",
    "Civil Engineering",
    "Mechanical Engineering",
    "Electrical Engineering",
    "Electronics Engineering",
    "Instrumentation and Control Engineering",
    "Production Engineering",
    "Mechatronics Engineering",
    "Information Technology",
    "Electronics & Communication Engineering",
  ];

  return (
    <>
      <div className="bg-slate-200">
        <Navbar />
        {loading ? (
          <Loader />
        ) : (
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center mb-6">
              <select
                className="w-1/3 p-2 border rounded-md bg-white text-gray-900 mr-2"
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
              >
                <option value="all">All Batches</option>
                {/* You can adjust the batch range as needed */}
                {Array.from({ length: 2023 - 1947 + 1 }, (_, index) => (
                  <option key={index} value={1947 + index}>
                    {1947 + index}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="name/roll no"
                value={searchTerm}
                onChange={handleSearch}
                className="w-1/3 p-2 border rounded-md bg-white text-gray-900 mr-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow"
              />

              <select
                className="w-1/3 p-2 border rounded-md bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow"
                value={selectedTrade}
                onChange={(e) => setSelectedTrade(e.target.value)}
              >
                <option value="">Select Trade</option>
                {Tradearr.map((trade, index) => (
                  <option key={index} value={trade}>
                    {trade}
                  </option>
                ))}
              </select>
            </div>

            <InfiniteScroll
              dataLength={users.length}
              next={loadMoreMember}
              hasMore={hasMore}
              className="postfix h-full"
              loader={<UserLoding text="Member" />}
            >
              <div className="flex flex-wrap -mx-4">
                {users?.map((user, i) => (
                  <UserCard key={i} user={user} />
                ))}
              </div>
            </InfiniteScroll>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

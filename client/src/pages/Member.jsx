import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer/Footer";
import axios from "axios";
import UserCard from "../components/UserCard";
import Loader from "../components/Loader";

export default function Member() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("all");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const fetchData = async () => {
    const url = `${process.env.REACT_APP_API_KEY}/admins/fetch`;
    // //console.log(url);

    try {
      const response = await axios.get(url);
      setUsers(response.data.data);
      // //console.log(response.data.data);
      setLoading(false);
    } catch (error) {
      // //console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = users;

    if (selectedBatch !== "all") {
      filtered = users.filter(
        (user) =>
          parseInt(user.startYear) <= parseInt(selectedBatch) &&
          parseInt(user.endYear) >= parseInt(selectedBatch)
      );
    }

    if (searchTerm !== "") {
      filtered = filtered.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
  }, [users, selectedBatch, searchTerm]);

  return (
    <>
      <div className="bg-slate-200">
        <Navbar />
        {loading ? (
          <Loader />
        ) : (
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="md:flex md:items-center">
                <select
                  className="w-full p-2 border rounded-md bg-white text-gray-900"
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
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Search users by name..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-2 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white shadow"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 15l-5-5 5-5"
                  />
                </svg>
              </div>
            </div>

            <div className="flex flex-wrap -mx-4">
              {filteredUsers?.map((user, i) => (
                <UserCard key={i} user={user} />
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

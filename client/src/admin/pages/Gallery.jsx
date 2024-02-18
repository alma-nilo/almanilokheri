import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pagination } from "@mui/material";
import GalleryUploadComponent from "../components/GalleryUploadComponent";
import GalleryViewComponent from "../components/GalleryViewComponent";

const App = () => {
  const [pictures, setPictures] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [paginationview, setPaginationview] = useState(false);

  const fetchGallery = async (pageNum) => {
    let URL = `${process.env.REACT_APP_API_KEY}/admins/allgallery?page=${pageNum}&perPage=5`;

    const config = {
      headers: {
        admin: true,
      },
    };

    try {
      const response = await axios.get(URL, config);
      setPictures(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      // Handle the error if necessary
    }
  };

  useEffect(() => {
    fetchGallery(currentPage);
  }, [currentPage]);

  return (
    <div className="container mx-auto p-8">
      <GalleryUploadComponent fetchGallery={fetchGallery} />
      <GalleryViewComponent
        pictures={pictures}
        pageview={setPaginationview}
        currentPage={currentPage}
        fetchGallery={fetchGallery}
      />
      <div className="flex justify-center mt-4 z-0">
        {paginationview ? (
          " "
        ) : (
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            color="success"
          />
        )}
      </div>
    </div>
  );
};

export default App;

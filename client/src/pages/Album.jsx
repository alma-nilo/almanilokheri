import { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import UserLoding from "../components/UserLoding";

import axios from "axios";
import { Pagination, Dialog, DialogContent } from "@mui/material";
import PhotoIcon from "@mui/icons-material/Photo";

export default function () {
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchGallery = async (pageNum) => {
    let URL = `${process.env.REACT_APP_API_KEY}/admins/allgallery?page=${pageNum}&perPage=12`;
    try {
      const response = await axios.get(URL);
      setGalleryImages(response.data.data);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      // Handle the error if necessary
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery(currentPage);
  }, [currentPage]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Render gallery images */}
        {galleryImages?.map((image) => (
          <div
            key={image._id}
            className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform hover:scale-105 transition-transform"
            onClick={() => handleImageClick(image)}
          >
            <img
              src={image.Document}
              alt={image.Title}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 flex items-center justify-center w-full h-full">
              <PhotoIcon className="text-white opacity-70 w-16 h-16" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)}
          color="primary"
        />
      </div>
      {loading && <UserLoding text="Gallery" />}

      {/* Dialog for image view */}
      {selectedImage && (
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          fullWidth
          maxWidth="md"
          PaperProps={{
            className: "rounded-md   border-4 ",
          }}
        >
          <DialogContent>
            <div className="relative p-2 text-center">
              <div className="mb-4 overflow-hidden ">
                <img
                  src={selectedImage.Document}
                  alt={selectedImage.Title}
                  className="w-full h-96 object-contain rounded-lg "
                />
                <p className="text-gray-600 ">{selectedImage.Title} </p>
              </div>
              <div className="absolute top-2 right-2">
                <button
                  onClick={handleCloseDialog}
                  className="bg-green-500 hover:bg-red-600 text-white px-2 py-1 rounded-full"
                >
                  <CloseIcon />
                </button>
              </div>
              {/* Add delete button or other actions here */}
              {/* Example delete button: */}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

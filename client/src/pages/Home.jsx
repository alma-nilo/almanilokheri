import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer/Footer";
import axios from "axios";
import Carousel from "../components/Carousel/MyCarousel";
import NewsAndEvent from "../components/NewsRoom";
import GalleryCard from "../components/GalleryCard";
// import DeviceCounter from "../components/DeviceCounter";
import UserLoding from "../components/UserLoding";
// import PaidIcon from "@mui/icons-material/Paid";
import DeviceCounter from "../components/DeviceCounter";
import { Dialog, DialogContent } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function Home({ deviceCount }) {
  const [userLoding, setUserLoding] = useState(true);
  const [userGallery, setUserGallery] = useState(true);
  const [Users, setUsers] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);

  const fetchuser = async () => {
    let URL = `${process.env.REACT_APP_API_KEY}/admins/fetchhomeuser`;
    try {
      const response = await axios.get(URL);
      setUsers(response.data.data);
      setUserLoding(false);
    } catch (error) {}
  };

  const fetchgallery = async () => {
    let URL = `${process.env.REACT_APP_API_KEY}/admins/gallery`;
    try {
      const response = await axios.get(URL);
      setGalleryImages(response.data.data);
      setUserGallery(false);
    } catch (error) {}
  };
  useEffect(() => {
    fetchuser();
    fetchgallery();
  }, []);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleCloseDialog = () => {
    console.log("first");
    setOpenDialog(true);
    setSelectedImage(null);
  };
  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpenDialog(true);
  };

  return (
    <>
      <div className=" bg-slate-200 overflow-hidden">
        <Navbar />

        <DeviceCounter deviceCount={deviceCount} />
        <div className="my-2">
          <Carousel />
        </div>

        <div className="my-2">
          <NewsAndEvent />
        </div>

        {/* card  */}
        <div className="w-full flex my-6 justify-center">
          <h1 className="text-2xl lg:text-4xl text-gray font-bold mb-6">
            Alumni profile
          </h1>
        </div>
        {userLoding ? (
          <UserLoding text="Alumni" />
        ) : (
          <div className="flex w-full overflow-x-scroll sm:overflow-hidden hover:overflow-x-scroll">
            {Users?.map((element) => (
              <Card element={element} />
            ))}
          </div>
        )}

        {/* gallary */}
        <div className="w-full flex my-6 justify-center">
          <h1 className="text-2xl lg:text-4xl text-gray font-bold mb-6">
            Gallery
          </h1>
        </div>
        {userGallery ? (
          <UserLoding text="Gallery" />
        ) : (
          <div className="w-full overflow-x-scroll sm:overflow-hidden hover:overflow-x-scroll">
            <div className="flex flex-nowrap">
              {galleryImages?.map((item) => {
                return (
                  <div>
                    <GalleryCard
                      image={item}
                      key={item._id}
                      handleImageClick={handleImageClick}
                    />
                    {selectedImage ? (
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
                              <p className="text-gray-600 ">
                                {selectedImage.Title}{" "}
                              </p>
                            </div>
                            <div className="absolute top-2 right-2">
                              <button
                                onClick={handleCloseDialog}
                                className="bg-green-500 hover:bg-red-600 text-white px-2 py-1 rounded-full"
                              >
                                <CloseIcon />
                              </button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div class="flex   sm:my-4 md:my-4 flex-col p-4 md:flex-row items-center justify-center h-auto md:h-60">
          <div class="w-full md:w-1/2 lg:w-1/3 p-4">
            <div class="flex rounded-lg overflow-hidden contribution-card">
              <div class="w-1/2 ">
                <img
                  src="/giveaway.png"
                  alt="Contributor"
                  class="h-52 md:h-64 w-full object-contain"
                  onClick={() =>
                    window.open(
                      "https://www.onlinesbi.sbi/sbicollect/icollecthome.htm?corpID=4592373",
                      "_blank"
                    )
                  }
                />
              </div>

              <div class="w-1/2">
                <img
                  src="/qrcode.png"
                  alt="Contributor"
                  class="h-52 md:h-64 w-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

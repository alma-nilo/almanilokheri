import React, {
  Suspense,
  useEffect,
  useState,
  lazy,
  useCallback,
  Fragment,
} from "react";
import axios from "axios";
import { Dialog, DialogContent } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import Carousel from "../components/Carousel/MyCarousel";
import UserLoding from "../components/UserLoding";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer/Footer";
import Card from "../components/Card";
import NewsAndEvent from "../components/NewsRoom";
import GalleryCard from "../components/GalleryCard";
import Loader from "../components/Loader";
import { AuthApi } from "../context/user";
import { Link } from "react-router-dom";
const DeviceCounter = lazy(() => import("../components/DeviceCounter"));
// import DeviceCounter from "../components/DeviceCounter";
// import PaidIcon from "@mui/icons-material/Paid";

export default function Home({ deviceCount }) {
  const [userLoding, setUserLoding] = useState(true);
  const [userGallery, setUserGallery] = useState(true);
  const [Users, setUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const { user } = AuthApi();

  const fetchuser = useCallback(async () => {
    let URL = `${process.env.REACT_APP_API_KEY}/admins/fetchhomeuser`;
    try {
      const response = await axios.get(URL);
      setUsers(response.data.data);
      setUserLoding(false);
    } catch (error) {}
  }, []);

  const fetchgallery = useCallback(async () => {
    let URL = `${process.env.REACT_APP_API_KEY}/admins/gallery`;
    try {
      const response = await axios.get(URL);
      setGalleryImages(response.data.data);
      setUserGallery(false);
    } catch (error) {}
  }, []);

  useEffect(() => {
    fetchuser();
    fetchgallery();
  }, []);

  const handleCloseDialog = useCallback(() => {
    // console.log("first");
    setOpenDialog(true);
    setSelectedImage(null);
  }, []);
  const handleImageClick = useCallback((image) => {
    setSelectedImage(image);
    setOpenDialog(true);
  }, []);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <div className=" bg-slate-200 overflow-hidden">
          <Navbar />

          <DeviceCounter deviceCount={deviceCount} />
          <div className="">
            <Carousel />
          </div>
          <div className="sm:flex-row sm:hidden flex flex-col h-full">
            <div className="min-h-full w-11/12 mx-auto p-5 rounded-lg bg-gradient-to-r bg-blue-500 via-teal-500 to-teal-400">
              <h4 className="text-center text-3xl font-semibold text-white/95 selection">
                Welcome to GBN Alumni Association
              </h4>

              <p className="text-base mt-3  text-white/95 text-center capitalize ">
                A registered body of the Alumni members of GBN Govt. polytechnic
                Nilokheri the where you to connect with fellow members and
                experience the growing Spirit of GBN Govt. polytechnic
                Nilokheri.
              </p>
              <div className="flex items-center justify-end w-full">
                <Link
                  to={`${user ? "/alumni" : "/signup"}`}
                  className="w-1/2 text-center hover:scale-110  mt-5 text-white hit-fit px-2 py-1 rounded-md text-base bg-green-500 hover:bg-emerald-500 transition-colors duration-200 ease-linear"
                >
                  {user ? "Go to Profile" : "Join Us"}
                </Link>
              </div>
            </div>
            <br />
            <div className="min-h-full w-11/12 mx-auto p-5 rounded-lg bg-gray-500">
              <h4 className="text-center text-3xl font-semibold text-white/95 selection">
                Reach Out to Us
              </h4>

              <p className="text-base mt-3  text-white/95 text-center capitalize ">
                We're always eager to hear from our alumni and learn about the
                amazing things you're doing. Whether you have a question, a
                suggestion, or just want to reconnect, we're here to listen
              </p>
              <div className="flex items-center justify-end w-full">
                <Link
                  to={`${user ? "/alumni" : "/signup"}`}
                  className="w-1/2 text-center hover:scale-110  mt-5 text-white hit-fit px-2 py-1 rounded-md text-base bg-yellow-500 hover:bg-orange-400 transition-colors duration-200 ease-linear"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <br />
            <div className="min-h-full w-11/12 mx-auto p-5 rounded-lg bg-gradient-to-r bg-lime-600 via-teal-500 to-red-400">
              <h4 className="text-center text-3xl font-semibold text-white/95 selection">
                Alumni Gallery Visit
              </h4>

              <p className="text-base mt-3  text-white/95 text-center capitalize ">
                Our alumni gallery visit is the perfect opportunity to catch up
                with friends and explore new exhibits.Discover the latest works
                of art at our gallery and learn more about the alumni community.
              </p>
              <div className="flex items-center justify-end w-full">
                <Link
                  to={`/gallery`}
                  className="w-1/2 text-center hover:scale-110  mt-5 text-white hit-fit px-2 py-1 rounded-md text-base bg-blue-500 hover:bg-indigo-500 transition-colors duration-200 ease-linear"
                >
                  Go To Gallery
                </Link>
              </div>
            </div>
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
                <Fragment key={element._id}>
                  <Card element={element} />
                </Fragment>
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
                {galleryImages?.map((item) => (
                  <Fragment key={item._id}>
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
                  </Fragment>
                ))}
              </div>
            </div>
          )}

          <div className="flex   sm:my-4 md:my-4 flex-col p-4 md:flex-row items-center justify-center h-auto md:h-60">
            <div className="w-full md:w-1/2 lg:w-1/3 p-4">
              <div className="flex rounded-lg overflow-hidden contribution-card">
                <div className="w-1/2 ">
                  <img
                    src="/giveaway.png"
                    alt="Contributor"
                    className="h-52 md:h-64 w-full object-contain"
                    onClick={() =>
                      window.open(
                        "https://www.onlinesbi.sbi/sbicollect/icollecthome.htm?corpID=4592373",
                        "_blank"
                      )
                    }
                  />
                </div>

                <div className="w-1/2">
                  <img
                    src="/qrcode.png"
                    alt="Contributor"
                    className="h-52 md:h-64 w-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </Suspense>
    </>
  );
}

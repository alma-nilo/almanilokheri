import Navbar from "../components/Navbar";
import Footer from "../components/Footer/Footer";
import { Link, Outlet } from "react-router-dom";

const GalleryComponent = () => {
  return (
    <>
      <div className="bg-slate-200">
        <Navbar />

        <div className="container mx-auto py-10">
          <div className="flex justify-center">
            <h1 className="text-2xl lg:text-4xl text-gray font-bold mb-6">
              Alumni Gallery
            </h1>
          </div>
          <div class="content-top-nav">
            <ul class="flex p-4">
              <li>
                <Link className="LinkNav mx-2" to="/gallery">
                  Albums
                </Link>
              </li>

              <li>
                <Link className="LinkNav mx-2" to="/gallery/memories">
                  Memories
                </Link>
              </li>
            </ul>
          </div>
          {/* content  */}

          <Outlet />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default GalleryComponent;

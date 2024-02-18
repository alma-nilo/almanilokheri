import React, { useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { AuthApi } from "../../context/user";
import { AlertApi } from "../../context/AlertContext";

import axios from "axios";

const GalleryViewComponent = ({
  pictures,
  pageview,
  currentPage,
  fetchGallery,
}) => {
  const [selectedPicture, setSelectedPicture] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [pictureToDelete, setPictureToDelete] = useState(null);
  const [pictureToEdit, setPictureToEdit] = useState(null);
  const [showEditDialog, setShowEditDialog] = useState(false);

  // context
  const { admin } = AuthApi();
  const { setAlert } = AlertApi();

  const handleDelete = (picture) => {
    setPictureToDelete(picture);
    setShowDeleteConfirmation(true);
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${admin?.token}`,
    },
  };

  // for deletion
  const handleConfirmDelete = async () => {
    let URL = `${process.env.REACT_APP_API_KEY}/admins/deletepicture?id=${selectedPicture.id}&image=${selectedPicture.path}`;

    try {
      await axios.get(URL, config);
      setShowDeleteConfirmation(false);

      setAlert({ type: "success", message: "Picture Deleted successful" });

      fetchGallery(currentPage);
      setSelectedPicture(null);
    } catch (error) {
      //console.log(error);
      setShowDeleteConfirmation(false);

      setAlert({ type: "error", message: "Somthing Went Wrong" });
    }
    pageview(false);
  };

  const handleCancelDelete = () => {
    setPictureToDelete(null);
    setShowDeleteConfirmation(false);
  };

  const handleEdit = (picture) => {
    setPictureToEdit({ id: picture._id, url: picture.Document });
    setSelectedPicture(picture);
    setEditedTitle(picture.Title);
    setShowEditDialog(true);
  };

  const handleCancelEdit = () => {
    setSelectedPicture(null);
    setEditedTitle("");
    setShowEditDialog(false);
  };
  const handleSaveEdit = async (picture) => {
    const URL = `${process.env.REACT_APP_API_KEY}/admins/editpicturetitle`;

    const payload = { editTitle: editedTitle, id: picture.id };

    // const formData = new FormData();
    // formData.append("editTitle", editedTitle);
    // formData.append("id", picture.id);
    try {
      // Use PUT instead of POST for updating existing resources
      await axios.post(URL, payload, config);

      setAlert({ type: "success", message: "Picture Edit successful" });

      fetchGallery(currentPage);
    } catch (error) {
      //console.log(error);

      setAlert({ type: "error", message: "Something Went Wrong" });
    }

    pageview(false);
    setSelectedPicture(null);
    setEditedTitle("");
    setShowEditDialog(false);
  };

  return (
    <div className="flex flex-wrap -mx-4 relative z-0">
      {pictures?.map((picture) => (
        <div
          key={picture._id}
          className={`w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 p-4 relative ${
            selectedPicture === picture._id ? "z-10" : ""
          }`}
          onClick={() =>
            setSelectedPicture({ id: picture._id, path: picture.Path })
          }
        >
          <div className="relative">
            <img
              src={picture.Document}
              alt={picture.Title}
              className={`w-56 h-36 object-cover rounded-lg transition-opacity ${
                selectedPicture === picture._id ? "opacity-100" : "opacity-80"
              }`}
            />
            <div className="absolute top-2 right-2">
              <button
                onClick={() => {
                  handleDelete(picture);
                  pageview(true);
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-full"
              >
                <DeleteForeverIcon />
              </button>
            </div>
          </div>
          <div className="flex items-center mt-4">
            <React.Fragment>
              <p className="text-white mr-2">{picture.Title}</p>
              <button
                onClick={() => {
                  handleEdit(picture);
                  pageview(true);
                }}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
              >
                Edit
              </button>
            </React.Fragment>
            {/* )} */}
          </div>
        </div>
      ))}

      {showDeleteConfirmation && (
        <div
          className={`fixed inset-0 flex items-center justify-center ${
            showDeleteConfirmation ? "visible" : "hidden"
          }`}
          style={{
            backdropFilter: showDeleteConfirmation ? "blur(8px)" : "none",
            zIndex: showDeleteConfirmation ? 999 : -1,
          }}
        >
          <div className="bg-white rounded-lg p-6 text-center">
            <p className="text-lg text-black font-semibold mb-4">
              Are you sure you want to delete this picture?
            </p>
            <div className="mb-4">
              <img
                src={pictureToDelete.Document}
                alt={pictureToDelete.Title}
                className="w-56 h-36 object-cover rounded-lg mx-auto"
              />
              <p className="text-gray-600 mt-2">{pictureToDelete.Title}</p>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => {
                  handleConfirmDelete();
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mr-2"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  handleCancelDelete();
                  pageview(false);
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditDialog && (
        <div
          className={`fixed inset-0 flex items-center justify-center ${
            showEditDialog ? "visible" : "hidden"
          }`}
          style={{
            backdropFilter: showEditDialog ? "blur(8px)" : "none",
            zIndex: showEditDialog ? 999 : -1,
          }}
        >
          <div className="bg-white rounded-lg p-6 text-center">
            <p className="text-lg text-black font-semibold mb-4">Edit Title</p>
            <div className="mb-4">
              <img
                src={pictureToEdit.url}
                alt={pictureToEdit.id}
                className="w-56 h-36 object-cover rounded-lg mx-auto"
              />

              <p className="text-gray-600 mt-2">
                {pictures.find((p) => p._id === selectedPicture)?.Title}
              </p>
            </div>
            <input
              type="text"
              className="px-3 py-2 rounded-md mb-4 w-64 bg-green-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <div className="flex justify-center">
              <button
                onClick={() => {
                  pageview(false);
                  handleSaveEdit(selectedPicture);
                }}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
              >
                Save
              </button>
              <button
                onClick={() => {
                  pageview(false);
                  handleCancelEdit(selectedPicture);
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md ml-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryViewComponent;

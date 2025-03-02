import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import NewsSwitch from "./NewsSwitch";
import axios from "axios";
import { AuthApi } from "../../context/user";
import { AlertApi } from "../../context/AlertContext";

const NewsView = ({ newsList, setNewsList, fetchNews }) => {
  // Sample news data for demonstration (replace with actual data)

  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedNewsForDelete, setselectedNewsForDelete] = useState(null);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [toggle, setToggle] = useState(null);
  const [loader, setloader] = useState(false);

  const handleEdit = (news) => {
    setSelectedNews(news);
    setToggle(news.newFlag);
    setEditDialogOpen(true);
    setloader(false);
  };

  const { admin } = AuthApi();
  const { setAlert } = AlertApi();

  const handleCancelEdit = () => {
    setEditDialogOpen(false);
    setSelectedNews(null);
    setloader(false);
  };

  const handleConfirmEdit = async (values) => {
    // Update the news item with new data (description and isFlag)

    if (
      values.description === selectedNews.description &&
      toggle === selectedNews.newFlag
    ) {
      setAlert({ type: "warning", message: "News can't be as previous" });
      return;
    }
    setloader(true);

    const url = `${process.env.REACT_APP_API_KEY}/admins/news/edit`;

    const playload = {
      id: selectedNews._id,
      newflag: toggle,
      description: values.description,
    };
    //console.log(playload);
    const config = {
      headers: {
        Authorization: `Bearer ${admin?.token}`,
      },
    };

    try {
      await axios.post(url, playload, config);
      setAlert({ type: "success", message: "News Updated successful" });
      setEditDialogOpen(false);
      setSelectedNews(null);
      setloader(false);
      fetchNews();
    } catch (error) {
      setAlert({ type: "error", message: "Somthing went wrong" });
    }
  };

  const handleDelete = (id, title) => {
    // Open the delete confirmation dialog
    setDeleteDialogOpen(true);
    setselectedNewsForDelete({ id: id, title: title });
  };

  const handleConfirmDelete = async () => {
    // Close the delete confirmation dialog
    const url = `${process.env.REACT_APP_API_KEY}/admins/news/delete`;

    const playload = {
      id: selectedNewsForDelete.id,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${admin?.token}`,
      },
    };

    try {
      await axios.post(url, playload, config);
      setAlert({ type: "success", message: "News Deleted successful" });

      setDeleteDialogOpen(false);
      setselectedNewsForDelete(null);
      fetchNews();
    } catch (error) {
      setAlert({ type: "error", message: "Somthing went wrong" });
    }
  };

  const handleCancelDelete = () => {
    // Close the delete confirmation dialog
    setDeleteDialogOpen(false);
    setselectedNewsForDelete(null);
  };
  const validationSchema = Yup.object().shape({
    description: Yup.string().required("Description is required"),
  });

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
    <div className="min-h-screen  ">
      <style>{blinkingTagStyle}</style>
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4">News View</h1>
        {newsList?.map((news) => (
          <div
            key={news._id}
            className={` border rounded-lg p-6 mb-4 shadow-md hover:shadow-lg transition duration-300 ${
              news.newFlag ? "relative" : ""
            }`}
          >
            {news.newFlag && <span className="blinking-tag">New</span>}
            <h2 className="text-xl font-bold mb-2">{news.title}</h2>
            <p className="text-purple-300 mb-2">{news.date}</p>
            <p className="text-sm mb-4">{news.description}</p>
            <div className="flex justify-between items-center">
              <div>
                <button
                  onClick={() => handleEdit(news)}
                  className="text-green-500 font-bold py-2 px-4 rounded mr-2 hover:bg-green-500 hover:text-white focus:outline-none focus:shadow-outline"
                >
                  Edit
                </button>
              </div>
              <button
                onClick={() => handleDelete(news._id, news.title)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Delete Confirmation Modal */}
      {selectedNewsForDelete && (
        <div
          className={`fixed inset-0 flex items-center justify-center ${
            isDeleteDialogOpen ? "visible" : "hidden"
          }`}
          style={{
            backdropFilter: isDeleteDialogOpen ? "blur(8px)" : "none",
            zIndex: isDeleteDialogOpen ? 999 : -1,
          }}
        >
          <div className="bg-white rounded-lg p-6 text-center">
            <p className="text-lg text-black font-semibold mb-4">
              Are you sure you want to delete this News?
            </p>
            <div className="mb-4">
              <p className="text-gray-600 mt-2">
                {selectedNewsForDelete.title}
              </p>
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
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Edit Dialog */}
      {selectedNews && (
        <div
          className={`fixed inset-0 flex items-center justify-center ${
            isEditDialogOpen ? "visible" : "hidden"
          }`}
          style={{
            backdropFilter: isEditDialogOpen ? "blur(8px)" : "none",
            zIndex: isEditDialogOpen ? 999 : -1,
          }}
        >
          <div className="bg-white border border-black rounded-lg p-8">
            <h2 className="text-xl font-bold mb-4 text-purple-700">
              Edit News
            </h2>
            <Formik
              initialValues={{
                description: selectedNews.description,
              }}
              validationSchema={validationSchema}
              onSubmit={handleConfirmEdit}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                      Description
                    </label>
                    <Field
                      name="description"
                      className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                        errors.description && touched.description
                          ? "border-red-500"
                          : ""
                      }`}
                      component="textarea"
                      rows="3"
                      placeholder="Enter news description"
                    />
                    {errors.description && touched.description && (
                      <p className="text-red-500 text-xs italic">
                        {errors.description}
                      </p>
                    )}
                  </div>

                  {selectedNews.newFlag ? (
                    <div className="mb-4">
                      <label className="flex items-center">
                        <NewsSwitch
                          checked={toggle}
                          onChange={() => setToggle(!toggle)}
                          color="success"
                        />
                        <span className="ml-2 text-gray-700 font-bold">
                          Mark as new
                        </span>
                      </label>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="text-gray-500 font-bold py-2 px-4 rounded mr-2 hover:bg-gray-200 focus:outline-none focus:shadow-outline"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loader}
                      className="bg-purple-800 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      {loader ? "Plz wait ....." : "Update"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};
export default NewsView;

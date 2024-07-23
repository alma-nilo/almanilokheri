import React, { useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import { Link } from "react-router-dom";
import { AuthApi } from "../../context/user";
import { AlertApi } from "../../context/AlertContext";

import axios from "axios";

const MessageDetailView = ({ message, onClose, onDelete, fetchMessage }) => {
  return (
    <div className="bg-gray-900  fixed bottom-4 right-10 z-40 h-96 w-72 overflow-hidden p-4 rounded-lg shadow-lg text-white">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-semibold">{message.name}</div>
        <button
          onClick={() => {
            onClose(false);
            fetchMessage();
          }}
          className="text-gray-400 hover:text-gray-300"
        >
          <ClearIcon />
        </button>
      </div>

      <hr className="border-gray-700 mb-4" />

      {/* <div className="text-2xl ">{message.name}</div> */}
      <div className="text-gray-400 text-sm mt-2">{message.email}</div>
      <div className="text-gray-400 text-sm mt-2">{message.mobile}</div>
      <div className="text-gray-400 text-sm mt-4">{message.time}</div>

      <div className=" bg-gray-800 mt-2 h-48 rounded-md p-2 overflow-y-auto msgBox ">
        <p className="text-gray-300 ">{message.message}</p>
      </div>
      <div className=" flex my-2 justify-between items-center">
        <button
          onClick={() => onDelete(message._id)}
          className="px-4 py-2 mx-2 w-full mb-2 text-white bg-red-500 hover:bg-red-600 rounded"
        >
          <DeleteIcon /> Delete
        </button>
        <button className="px-4 py-2 flex justify-center items-center mx-2 w-full mb-2 text-white bg-green-500 hover:bg-green-600 rounded">
          <a href={`mailto:${message.email}`}>
            Send <MarkunreadIcon />
          </a>
        </button>
        {/* <button
          onClick={onClose}
          className="px-4 py-2 text-gray-400 bg-gray-700 hover:bg-gray-600 rounded"
        >
          Close
        </button> */}
      </div>
    </div>
  );
};

const MessageBox = ({ setShowMessage, fetchUnreadCount }) => {
  const [messages, setMessage] = useState([]);
  const [loading, setloading] = useState(true);
  const [hoveredMessage, setHoveredMessage] = useState(null);
  const [messageToDelete, setMessageToDelete] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);
  const { setAlert } = AlertApi();
  const { admin } = AuthApi();

  const fetchMessage = async () => {
    try {
      setloading(true);
      const URL = `${process.env.REACT_APP_API_KEY}/admins/contactUs`;
      const config = {
        headers: {
          Authorization: `Bearer ${admin?.token}`,
        },
      };
      const response = await axios.get(URL, config);
      setMessage(response.data);
      setloading(false);
    } catch (error) {}
  };

  // Function to handle opening the delete confirmation dialog
  const handleDeleteClick = (messageIndex) => {
    setMessageToDelete(messageIndex);
  };

  // Function to handle closing the delete confirmation dialog
  const handleDeleteConfirm = async () => {
    try {
      const URL = `${process.env.REACT_APP_API_KEY}/admins/ContactUsDelete?_id=${messageToDelete}`;
      await axios.post(URL);
      setMessageToDelete(null);
      setSelectedMessage(null);
      setIsDetailViewOpen(false);
      setAlert({ type: "success", message: "Delete success" });
      fetchMessage();
    } catch (error) {
      //console.log(error);
    }
  };

  const MsgRead = async (_id, state) => {
    //console.log(_id, state);

    if (state) {
      const URL = `${process.env.REACT_APP_API_KEY}/admins/contactUsCount?_id=${_id}`;

      await axios.post(URL);
    }
    return;
  };

  const handleMessageClick = (messageIndex) => {
    setSelectedMessage(messageIndex);
    setIsDetailViewOpen(true);
  };

  useEffect(() => {
    fetchMessage();
  }, [admin]);

  return (
    <>
      {isDetailViewOpen && (
        <MessageDetailView
          message={messages[selectedMessage]}
          onClose={setIsDetailViewOpen}
          onDelete={handleDeleteClick}
          fetchMessage={fetchMessage}
        />
      )}

      {/*  detail msg */}

      <div
        className={`fixed bottom-4 right-10  z-30 h-96 w-72 overflow-hidden `}
      >
        <div className="bg-gray-900 p-4 shadow-lg rounded-lg text-white h-full">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <img
                className="w-12 h-12 bg-green-500 rounded-full mr-2 object-cover"
                src="https://images.pexels.com/photos/8059110/pexels-photo-8059110.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
              {/* </img>{" "} */}
              {/* Admin Avatar */}
              <h2 className="text-xl font-semibold">Messages</h2>
            </div>
            <button
              onClick={() => setShowMessage(false)}
              className="text-white hover:text-gray-400"
            >
              <ClearIcon
                onClick={() => {
                  setShowMessage(false);
                  fetchUnreadCount();
                }}
              />{" "}
              {/* Material-UI Close Icon */}
            </button>
          </div>
          <hr className="border-gray-700 mb-4" /> {/* Line separator */}
          <div className="overflow-y-auto msgBox h-72">
            {loading ? (
              <div class="loader-container">
                <div class="loader">
                  {" "}
                  <p className="loader-text">Loading</p>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-gray-700">
                {messages?.map((message, index) => (
                  <div
                    key={index}
                    className={`py-4 ${
                      hoveredMessage === index
                        ? "bg-gray-800 p-2 rounded-md cursor-pointer"
                        : ""
                    }`}
                    onMouseEnter={() => setHoveredMessage(index)}
                    onMouseLeave={() => setHoveredMessage(null)}
                    onClick={() => {
                      handleMessageClick(index);
                      MsgRead(message._id, message.unread);
                    }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <div
                          className={`text-lg  ${
                            message.unread
                              ? "font-extrabold text-white"
                              : " text-gray-300 font-normal"
                          } `}
                        >
                          {message.name}
                        </div>
                        <div
                          className={`${
                            message.unread ? "font-bold " : ""
                          }text-sm text-gray-400 `}
                        >
                          {message.email}
                        </div>
                      </div>
                      <div className={`text-sm text-gray-400`}>
                        {hoveredMessage === index ? (
                          <button>
                            <DeleteIcon
                              onClick={() => handleDeleteClick(message._id)}
                            />
                          </button>
                        ) : (
                          <>
                            {message.unread && (
                              <span className="mr-2 bg-green-500 h-2 w-2 rounded-full inline-block"></span>
                            )}
                            {message.time}
                          </>
                        )}
                      </div>
                    </div>
                    <div
                      className={` ${
                        message.unread
                          ? "text-white font-bold"
                          : " text-sm text-gray-300"
                      } `}
                    >
                      {message.message.slice(0, 20)} ...
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {messageToDelete !== null && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50   "
            style={{
              backdropFilter: messageToDelete ? "blur(8px)" : "none",
              zIndex: messageToDelete ? 999 : -1,
            }}
          >
            <div className="bg-white p-4 w-80 rounded-lg shadow-lg">
              <p className="text-gray-700 text-md mb-4">
                Are you sure you want to delete this Message ?
              </p>
              <div className="flex justify-end">
                <button
                  className="mr-2 px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded"
                  onClick={handleDeleteConfirm}
                >
                  Delete
                </button>
                <button
                  className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded"
                  onClick={() => setMessageToDelete(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MessageBox;

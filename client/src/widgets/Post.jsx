// Posts.js
import React, { useState } from "react";
import { Paper, Avatar, Typography, Box, IconButton } from "@mui/material";
import { DeleteForever } from "@mui/icons-material";
import axios from "axios";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import UserLoding from "../components/UserLoding";
import { AuthApi } from "../context/user";
import { AlertApi } from "../context/AlertContext";
import CreatePost from "./CreatePostWidget";
import { useLocation } from "react-router-dom";

const Posts = ({ UserProfile, uuid, status }) => {
  const [postsData, setpostsData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [pictureToDelete, setPictureToDelete] = useState(null);

  const { user } = AuthApi();
  const { setAlert } = AlertApi();
  const { pathname } = useLocation();
  const loadMorePosts = async () => {
    try {
      // Fetch more posts from your API using Axios

      if (uuid) {
      } else {
      }
      let url = uuid
        ? `${process.env.REACT_APP_API_KEY}/admins/post?page=${page}&id=${uuid}`
        : `${process.env.REACT_APP_API_KEY}/admins/post?page=${page}`;
      const response = await axios.get(url);
      const newData = response.data.data;
      // console.log(newData);
      // console.log(response);

      if (newData.length > 0) {
        setpostsData((prevItems) => {
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
    loadMorePosts();
  }, [uuid]);

  // console.log(postsData);
  // for deletion
  const handleDelete = (picture) => {
    setPictureToDelete(picture);
    setShowDeleteConfirmation(true);
  };

  const handleCancelDelete = () => {
    setPictureToDelete(null);
    setShowDeleteConfirmation(false);
  };

  const handleConfirmDelete = async (post) => {
    const url = `${process.env.REACT_APP_API_KEY}/admins/post/delete`;
    const config = {
      headers: {
        authorization: `Bearer ${user?.Token}`,
      },
    };
    const playload = {
      id: post._id,
      image: post.path,
    };

    try {
      await axios.post(url, playload, config);
      setpostsData((prevItems) =>
        prevItems.filter((item) => item._id !== post._id)
      );
      setShowDeleteConfirmation(null);
      setPictureToDelete(null);
      setAlert({
        type: "success",
        message: "Success Post Delete ",
      });
    } catch (error) {
      console.log(error);
      setAlert({
        type: "error",
        message: "Somthing went Wrong ",
      });
    }
  };

  return (
    <>
      {pathname === "/alumni" ? (
        <CreatePost setpostsData={setpostsData} status={status} />
      ) : (
        ""
      )}

      <div
        className={`flex justify-center h-auto postfix overflow-scroll mt-4 w-full`}
      >
        <div
          className={`flex h-auto  flex-col p-4 items-center  mt-2 space-y-4  ${
            UserProfile ? "md:w-full" : "md:w-5/12"
          }  `}
        >
          <InfiniteScroll
            dataLength={postsData.length}
            next={loadMorePosts}
            hasMore={hasMore}
            loader={<UserLoding text="Post" />}
          >
            {postsData.map((post) => (
              <Paper
                key={post._id}
                className="p-4 mt-3 bg-white rounded-md shadow-md"
              >
                <div className={`flex items-center `}>
                  <div className="flex items-center space-x-2">
                    <Avatar src={post.avtar} alt="User Avatar" />
                    <h2 variant="subtitle1">{post?.name}</h2>
                  </div>
                  <div className={pathname === "/alumni" ? "" : "hidden"}>
                    <DeleteForever
                      onClick={() => handleDelete(post)}
                      className=" ml-20 text-red-600 hover:text-red-400"
                    />
                  </div>
                </div>
                <Typography variant="body1" sx={{ marginTop: "0.5rem" }}>
                  {post.content}
                </Typography>
                {post.image && (
                  <Box mt="1rem">
                    <img src={post.image} alt="Post Image" className="w-full" />
                  </Box>
                )}
              </Paper>
            ))}
          </InfiniteScroll>

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
                  Are you sure you want to delete this post ?
                </p>
                <div className="mb-4">
                  {pictureToDelete.image ? (
                    <img
                      src={pictureToDelete.image}
                      alt={pictureToDelete.Title}
                      className="w-56 h-36 object-cover rounded-lg mx-auto"
                    />
                  ) : (
                    ""
                  )}

                  <p className="text-gray-600 mt-2">
                    {pictureToDelete.content}
                  </p>
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={() => {
                      handleConfirmDelete(pictureToDelete);
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mr-2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      handleCancelDelete();
                      // pageview(false);
                    }}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Posts;

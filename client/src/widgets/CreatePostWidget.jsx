import React, { useState } from "react";
import {
  Box,
  Divider,
  Typography,
  Button,
  TextField,
  Paper,
  Avatar,
  IconButton,
} from "@mui/material";
import { AttachFile, InsertPhoto } from "@mui/icons-material";
import { EditOutlined, DeleteOutlined } from "@mui/icons-material";

import AWS from "aws-sdk";

import Dropzone from "react-dropzone";
import FlexBetween from "../components/FlexBetween";
import { useEffect } from "react";
import { AuthApi } from "../context/user";
import axios from "axios";
import { AlertApi } from "../context/AlertContext";

const S3_BUCKET = process.env.REACT_APP_AWS_S3_BUCKET;
const REGION = process.env.REACT_APP_AWS_REGION;

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_Access_key,
  secretAccessKey: process.env.REACT_APP_AWS_secret_key,
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

const CreatePost = ({ setpostsData, status }) => {
  const [progress, setProgress] = useState(1);
  const [containsImage, setContainsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // For image preview
  const [caption, setCaption] = useState("");
  const [loader, setLoader] = useState(true);
  const [posting, setPosting] = useState(false);

  const { user } = AuthApi();
  const { setAlert } = AlertApi();
  useEffect(() => {
    if (caption || image) {
      setLoader(false);
    } else {
      setLoader(true);
    }
  }, [image, caption]);

  const handleImageChange = (acceptedFiles) => {
    const selectedImage = acceptedFiles[0];

    // Check if a file is selected and it's an image
    if (selectedImage && selectedImage.type.startsWith("image/")) {
      // Check if file size is within limit (2MB)
      if (selectedImage.size <= 2 * 1024 * 1024) {
        // 2MB in bytes
        setImage(selectedImage);
        setImagePreview(URL.createObjectURL(selectedImage)); // Create image preview URL
      } else {
        // Display error message or handle accordingly
        setAlert({
          type: "warning",
          message: "File size exceeds the limit of 2MB.",
        });
      }
    } else {
      // Display error message or handle accordingly for non-image files
      setAlert({
        type: "warning",
        message: "Only image files are accepted.",
      });
    }
  };

  const handleSubmit = async (file) => {
    console.log(status);
    if (status === "Block") {
      setAlert({
        type: "error",
        message: "You are Block! Not Able to Post.",
      });
      return;
    }

    if (status !== "Approve") {
      setAlert({
        type: "error",
        message: "You are Not Verified! Not Able to Post.",
      });
      return;
    }

    setLoader(true);
    setPosting(true);

    try {
      let playload = {
        content: caption,
        url: "",
        path: "",
      };

      if (file) {
        const params = {
          Body: file,
          Bucket: S3_BUCKET,
          Key: `posts/${file.name}_${Date.now()}`,
        };

        // console.log(params);

        const response = await myBucket
          .upload(params)
          .on("httpUploadProgress", (evt) => {
            setProgress(Math.round((evt.loaded / evt.total) * 100));
          })
          .promise();
        // console.log("Upload successful:", response);

        playload.url = response.Location;
        playload.path = response.key;
      }

      const config = {
        headers: {
          authorization: `Bearer ${user?.Token}`,
        },
      };

      const url = `${process.env.REACT_APP_API_KEY}/admins/post`;

      const res = await axios.post(url, playload, config);

      setpostsData((prevItems) => [res.data.post, ...prevItems]);
      setCaption("");
      setImage(null);
      setImagePreview(null); // Clear image preview after upload

      setAlert({
        type: "success",
        message: "Success Post",
      });
    } catch (error) {
      setAlert({
        type: "error",
        message: "Something went wrong",
      });
    }
    setPosting(false);
    setLoader(false);
  };

  return (
    <Paper className="p-4 mt-2 space-y-4 w-full md:full bg-white rounded-md shadow-md">
      <div className="flex items-center space-x-2">
        <Avatar src={user?.profile} alt="User Avatar" />
        <TextField
          id="outlined-multiline-flexible"
          label="What's on your mind?"
          multiline
          maxRows={4}
          fullWidth
          value={caption}
          variant="outlined"
          onChange={(e) => {
            setCaption(e.target.value);
          }}
        />
      </div>

      {containsImage && (
        <Box border={`1px solid gray`} borderRadius="5px" mt="1rem" p="1rem">
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => handleImageChange(acceptedFiles)}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                {posting ? (
                  <div className="w-full  flex justify-center">
                    {/* Your existing UI components... */}
                    {progress > 0 && (
                      <div className="relative w-20 h-20 mx-auto">
                        <div className="absolute top-0 left-0 w-full h-full border-4 border-green-500 rounded-full"></div>
                        <div
                          className="absolute top-0 left-0 w-full h-full border-4 border-blue-500 rounded-full animate-spin"
                          style={{
                            clip: `rect(0, ${progress / 100} * 32px, 32px, 0)`,
                          }}
                        ></div>
                        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                          <div className="text-xs text-gray-700">
                            {progress}%
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Box
                    {...getRootProps()}
                    border={`2px dashed cyan`}
                    p="1rem"
                    width="100%"
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    <input {...getInputProps()} />
                    {!image ? (
                      <p>Add Image Here</p>
                    ) : (
                      <FlexBetween>
                        <Typography>{image.name}</Typography>
                        <EditOutlined />
                      </FlexBetween>
                    )}
                  </Box>
                )}

                {image && (
                  <div className=" p-2">
                    {posting ? (
                      ""
                    ) : (
                      <IconButton
                        onClick={() => {
                          setImage(null);
                          setImagePreview(null);
                        }}
                        sx={{ width: "15%" }}
                      >
                        <DeleteOutlined />
                      </IconButton>
                    )}
                  </div>
                )}
              </FlexBetween>
            )}
          </Dropzone>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              style={{ marginTop: "10px", width: "100%", height: "auto" }}
            />
          )}
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <IconButton
            color="primary"
            onClick={() => setContainsImage(!containsImage)}
          >
            <InsertPhoto />
          </IconButton>
          <IconButton color="primary">
            <AttachFile />
          </IconButton>
        </div>
        <Button
          variant="contained"
          color="primary"
          disabled={loader && user}
          onClick={() => handleSubmit(image)}
        >
          {!posting ? "Post" : "Posting....."}
        </Button>
      </div>
    </Paper>
  );
};

export default CreatePost;

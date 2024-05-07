import React, { useEffect, useState } from "react";

import { Box, Typography, IconButton } from "@mui/material";
import AWS from "aws-sdk";

import { EditOutlined, DeleteOutlined } from "@mui/icons-material";

import Dropzone from "react-dropzone";
import FlexBetween from "../FlexBetween";
import { AlertApi } from "../../context/AlertContext";
import { ErrorMessage } from "formik";
import axios from "axios";

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

const PhotoUploadComponent = ({ data, setprofileExist }) => {
  const [progress, setProgress] = useState(1);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // For image preview
  const [uploadComplete, setUploadComplete] = useState(false);
  const { setAlert } = AlertApi();

  const [posting, setPosting] = useState(false);

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

  const handleSubmit = async () => {
    // Prevent the default form submission

    try {
      if (image) {
        setPosting(true);

        const params = {
          Body: image,
          Bucket: S3_BUCKET,
          Key: `profile/_${Date.now()}${image.name}`,
        };

        // console.log(params);

        const response = await myBucket
          .upload(params)
          .on("httpUploadProgress", (evt) => {
            setProgress(Math.round((evt.loaded / evt.total) * 100));
          })
          .promise();
        // console.log("Upload successful:", response);

        let url = `${process.env.REACT_APP_API_KEY}/tempuserdocs`;

        await axios.post(url, {
          data: data,
          profile: response.Location,
          profileKey: response.key,
        });
        setImage(null);
        // Clear image preview after upload
        setprofileExist(true);
        setAlert({ type: "success", message: "Piture Upload" });
        setUploadComplete(true);
      } else {
        setAlert({ type: "error", message: "Image are required" });
      }
    } catch (error) {
      console.error("Axios Error:", error);

      setAlert({ type: "error", message: "Somthing Went Wrong" });
    }

    setPosting(false);
  };

  const imagesync = (data) => {
    if (data.profile) {
      setUploadComplete(true);
      setImagePreview(data.profile);
      setprofileExist(true);
    }
  };

  useEffect(() => {
    // render
    imagesync(data);
  }, [data]);

  return (
    <div className="p-2 rounded-lg">
      {uploadComplete ? (
        <img
          src={imagePreview}
          alt="Preview"
          style={{ marginTop: "10px", width: "100%", height: "auto" }}
        />
      ) : (
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
                      <p>Add Profile Photo Here</p>
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

          <ErrorMessage
            name="profile"
            component="div"
            className="text-red-500"
          />

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              style={{ marginTop: "10px", width: "100%", height: "auto" }}
            />
          )}
        </Box>
      )}
      {image ? (
        <button
          onClick={handleSubmit}
          className="bg-green-600 mt-2
           hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          disabled={posting}
        >
          {posting ? "Plz wait ..." : "Upload"}
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default PhotoUploadComponent;

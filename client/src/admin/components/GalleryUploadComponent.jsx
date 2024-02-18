import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Header from "../components/Header";
import axios from "axios";
import { AuthApi } from "../../context/user";
import { AlertApi } from "../../context/AlertContext";
import { Box, Typography, IconButton } from "@mui/material";
import AWS from "aws-sdk";

import { EditOutlined, DeleteOutlined } from "@mui/icons-material";

import Dropzone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween";

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

const GalleryUploadComponent = ({ fetchGallery }) => {
  const [progress, setProgress] = useState(1);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // For image preview
  const [caption, setCaption] = useState("");
  const [loader, setLoader] = useState(true);
  const [posting, setPosting] = useState(false);

  const initialValues = {
    title: "",
  };
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

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
  });
  // context
  const { setAlert } = AlertApi();

  const { admin } = AuthApi();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    // Prevent the default form submission

    let playload = {
      Title: values.title,
      url: "",
      path: "",
    };

    if (image) {
      setSubmitting(true);
      setPosting(true);

      const params = {
        Body: image,
        Bucket: S3_BUCKET,
        Key: `gallery/${image.name}_${Date.now()}`,
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
    } else {
      setAlert({ type: "error", message: "Image are required" });
    }
    console.log(playload);

    const url = `${process.env.REACT_APP_API_KEY}/admins/uploadDocument`;

    try {
      await axios.post(url, playload, {
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
      });

      // //console.log("API response:", response.data);

      setImage(null);
      setImagePreview(null); // Clear image preview after upload
      setAlert({ type: "success", message: "Piture Upload" });
      fetchGallery(1);
      // Handle any further logic here if needed
    } catch (error) {
      // console.error("Axios Error:", error);

      setAlert({ type: "error", message: "Somthing Went Wrong" });
    }
    resetForm();
    setSubmitting(false);
    setPosting(false);
  };

  return (
    <div className="p-8 rounded-lg">
      <Header title="Gallery" subtitle="Upload image to gallery" />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-white mb-2">
                Title:
              </label>
              <Field
                type="text"
                id="title"
                name="title"
                className="w-full px-4 py-2 rounded-lg bg-purple-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Enter title"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 mt-2"
              />
            </div>

            {/* <div>
              <label htmlFor="image" className="block text-white mb-2">
                Upload Image:
              </label>
              <input
                type="file"
                id="image"
                name="image"
                className="w-full px-4 py-2 rounded-lg bg-purple-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
                onChange={(event) => {
                  setFieldValue("image", event.currentTarget.files[0]);
                }}
              />
              <ErrorMessage
                name="image"
                component="div"
                className="text-red-500 mt-2"
              />
            </div> */}

            <Box
              border={`1px solid gray`}
              borderRadius="5px"
              mt="1rem"
              p="1rem"
            >
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
                                clip: `rect(0, ${
                                  progress / 100
                                } * 32px, 32px, 0)`,
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

            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Plz wait ..." : "Upload"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default GalleryUploadComponent;

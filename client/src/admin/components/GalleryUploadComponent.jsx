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
  const [images, setImages] = useState([]); // Store array of images
  const [imagePreviews, setImagePreviews] = useState([]); // For image previews

  const [posting, setPosting] = useState(false);

  const initialValues = {
    title: "",
  };
  // Function to handle image removal
  const handleRemoveImage = (indexToRemove) => {
    setImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleImageChange = (acceptedFiles) => {
    let selectedImages = [];
    let previews = [];

    acceptedFiles.forEach((file) => {
      if (file.type.startsWith("image/") && file.size <= 2 * 1024 * 1024) {
        selectedImages.push(file);
        previews.push(URL.createObjectURL(file));
      }
    });

    setImages(selectedImages);
    setImagePreviews(previews);
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
  });

  // context
  const { setAlert } = AlertApi();

  const { admin } = AuthApi();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    setPosting(true);

    try {
      const uploadPromises = images.map(async (image) => {
        const params = {
          Body: image,
          Bucket: S3_BUCKET,
          Key: `gallery/${image.name}_${Date.now()}`,
        };

        const response = await myBucket.upload(params).promise();
        return response;
      });

      const uploadedResults = await Promise.all(uploadPromises);

      const payloads = uploadedResults.map((response) => ({
        Title: values.title,
        Document: response.Location,
        Path: response.key,
      }));

      const url = `${process.env.REACT_APP_API_KEY}/admins/uploadDocument`;

      await axios.post(url, payloads, {
        headers: {
          Authorization: `Bearer ${admin.token}`,
        },
      });

      setImages([]);
      setImagePreviews([]);
      setAlert({ type: "success", message: "Pictures Uploaded" });
      fetchGallery(1);
    } catch (error) {
      setAlert({ type: "error", message: "Something Went Wrong" });
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
        {({ isSubmitting }) => (
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

            <Box
              border={`1px solid gray`}
              borderRadius="5px"
              mt="1rem"
              p="1rem"
            >
              <Dropzone
                acceptedFiles=".jpg,.jpeg,.png"
                multiple={true} // Allow multiple files
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
                        {!images.length ? (
                          <p>Add Image Here</p>
                        ) : (
                          images.map((image, index) => (
                            <FlexBetween key={index}>
                              <Typography>{image.name}</Typography>
                              <EditOutlined />
                            </FlexBetween>
                          ))
                        )}
                      </Box>
                    )}

                    {images.length > 0 && (
                      <div className=" p-2">
                        {posting ? (
                          ""
                        ) : (
                          <IconButton
                            onClick={() => {
                              setImages([]);
                              setImagePreviews([]);
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
              <div className="w-full flex overflow-x-scroll  mt-5 whitespace-nowrap">
                {imagePreviews.map((preview, index) => (
                  <div
                    key={index}
                    className=" w-74 relative mr-2" // Adjust margin between images as needed
                  >
                    <img
                      src={preview}
                      alt="Preview"
                      className="mt-2 w-74 object-cover h-64" // Adjust height as needed
                    />
                    <IconButton
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 bg-red-600"
                    >
                      <DeleteOutlined />
                    </IconButton>
                  </div>
                ))}
              </div>
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

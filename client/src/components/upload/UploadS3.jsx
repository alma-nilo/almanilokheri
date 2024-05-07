import React, { useEffect, useState } from "react";
import AWS from "aws-sdk";
import { ErrorMessage } from "formik";
import { AlertApi } from "../../context/AlertContext";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
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

const UploadImageToS3WithNativeSdk = ({
  filed,
  title,
  data,
  setproofExist,
}) => {
  const { setAlert } = AlertApi();

  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file && file.type.startsWith("image/") && file.size <= maxSize) {
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(file);
      setUploadedImageUrl(null);

      if (file.size > maxSize) {
        setAlert({
          type: "warning",
          message: "File size exceeds the limit of 2MB.",
        });
      }
    }
  };

  const uploadFile = async (file) => {
    setUploading(true);
    const params = {
      Body: file,
      Bucket: S3_BUCKET,
      Key: `${filed}/${Date.now()}_${file.name}`,
    };

    try {
      const response = await myBucket
        .upload(params)
        .on("httpUploadProgress", (evt) => {
          setProgress(Math.round((evt.loaded / evt.total) * 100));
        })
        .promise();

      let url = `${process.env.REACT_APP_API_KEY}/tempuserdocs`;

      await axios.post(url, {
        data: data,
        proof: response.Location,
        proofKey: response.key,
      });
      setproofExist(true);
      setUploadComplete(true);
    } catch (err) {
      console.error("Error uploading file:", err);
      setAlert({
        type: "warning",
        message: "Error uploading file:",
      });
    } finally {
      setUploading(false);
    }
  };

  const cancelUpload = () => {
    setProgress(0);
    setSelectedFile(null);
    setUploading(false);
  };

  const removeFile = () => {
    setProgress(0);
    setSelectedFile(null);
    setUploadedImageUrl(null);
    setUploadComplete(false); // Reset upload status
  };

  const imagesync = (data) => {
    if (data.proof) {
      setUploadComplete(true);
      setSelectedFile(data.proof);
      setUploadedImageUrl(data.proof);
      setproofExist(true);
    }
  };

  useEffect(() => {
    // render
    imagesync(data);
  }, [data]);

  return (
    <div className=" bg-gray-100 flex justify-center sm:py-5">
      <div className="px-5 py-8 bg-white rounded-lg shadow-md w-96 mx-auto">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>
          {uploadedImageUrl ? (
            <div className="mb-4">
              <img
                src={uploadedImageUrl}
                alt="Uploaded"
                className="max-h-40 mx-auto mb-2"
              />
              {uploadComplete ? (
                ""
              ) : (
                <button
                  onClick={removeFile}
                  className="text-sm text-gray-500 underline focus:outline-none"
                >
                  Remove (2mb)
                </button>
              )}
            </div>
          ) : (
            <div>
              <input
                type="file"
                onChange={handleFileInput}
                id={filed}
                name={filed}
                className="border border-gray-300 rounded-md px-4 py-2 w-full mb-4"
                disabled={uploading}
              />

              {uploadComplete ? (
                ""
              ) : (
                <button
                  onClick={removeFile}
                  className="text-sm text-gray-500 mb-4 underline focus:outline-none"
                >
                  Remove
                </button>
              )}
              <ErrorMessage
                name={filed}
                component="div"
                className="text-red-500 mt-2"
              />
            </div>
          )}
          {uploading ? (
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-500 rounded-full"></div>
              <div
                className="absolute top-0 left-0 w-full h-full border-4 border-blue-500 rounded-full animate-spin"
                style={{ clip: `rect(0, ${progress / 100} * 32px, 32px, 0)` }}
              ></div>
              <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                <div className="text-xs text-gray-700">{progress}%</div>
              </div>
            </div>
          ) : (
            <div>
              {uploadComplete ? (
                <div
                  className={`bg-green-500 text-white py-2 px-4 rounded-md w-full ${
                    (!selectedFile || uploading) && // Disable if no file, uploading or invalid image
                    "opacity-50 cursor-not-allowed"
                  }`}
                >
                  <CheckCircleIcon />
                </div>
              ) : (
                <button
                  onClick={() => uploadFile(selectedFile)}
                  disabled={uploading} // Disable if uploading or invalid image
                  className={`bg-blue-500 text-white py-2 px-4 rounded-md w-full ${
                    (!selectedFile || uploading) && // Disable if no file, uploading or invalid image
                    "opacity-50 cursor-not-allowed"
                  }`}
                >
                  Upload
                </button>
              )}
            </div>
          )}
          {uploading && (
            <button
              onClick={cancelUpload}
              className="text-sm text-gray-500 mt-2 underline focus:outline-none"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadImageToS3WithNativeSdk;

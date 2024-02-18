import { storage } from "../auth/firebase.js";
import AWS from "aws-sdk";

import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { auth } from "../auth/firebaseAdmin.js";

import * as dotenv from "dotenv";
dotenv.config();

const S3_BUCKET = process.env.AWS_S3_BUCKET;
const REGION = process.env.AWS_REGION;


AWS.config.update({
  accessKeyId: process.env.AWS_Access_key,
  secretAccessKey: process.env.AWS_secret_key,
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

// Add a function to upload an image to Firebase Storage
export const uploadImageToStorage = async (file, section) => {
  try {
    const path = section + "/" + file.originalname + Date.now();
    const storageRef = ref(storage, path);

    // metadata

    let metadata = {
      contentType: file.mimetype,
    };

    // Upload the file using the put method
    const snapshot = await uploadBytesResumable(
      storageRef,
      file.buffer,
      metadata
    );

    // Get the download URL for the uploaded image
    const downloadURL = await getDownloadURL(snapshot.ref);

    const data = {
      url: downloadURL,
      Path: path,
    };

    return data;
  } catch (error) {
    console.error("Image upload error:", error);
    return null;
  }
};

export const deleteImageToStorage = (image) => {
  let params = { Bucket: S3_BUCKET, Key: image };

  myBucket.deleteObject(params, function (err, data) {
    if (err) {
      console.log(err, err.stack);
      return false  // error
    } else {
      console.log(data)
      console.log("done")
      return true            // deleted
    }
  });

  console.log("func")

};


export const deleteAccount = async (uuid) => {
  try {
    await auth.deleteUser(uuid);

    return true;
  } catch (error) {
    return false;
  }
};

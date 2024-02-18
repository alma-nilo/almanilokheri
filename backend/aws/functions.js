
import AWS from "aws-sdk";
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



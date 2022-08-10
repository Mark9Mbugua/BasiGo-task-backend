require("dotenv").config();
const fs = require("fs");
const S3 = require("aws-sdk/clients/s3");

// const bucketName = process.env.AWS_BUCKET_NAME;
// const region = process.env.AWS_BUCKET_REGION;
// const accessKeyId = process.env.AWS_ACCESS_KEY;
// const secretAccesskey = process.env.AWS_SECRET_KEY;

const bucketName = "basigo-challenge";
const region = "ap-south-1";
const accessKeyId = "AKIA3BJRUBRVE2C4HQXN";
const secretAccesskey = "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";

const s3 = new S3({
  region,
  accessKeyId,
  secretAccesskey,
});

//upload a file to s3
module.exports = function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  };
  console.log(s3.upload(uploadParams).promise());
  return s3.upload(uploadParams).promise();
};
// exports.uploadFile = uploadFile;

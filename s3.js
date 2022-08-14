require("dotenv").config();
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 =  new AWS.S3({
  accessKeyId,
  secretAccessKey,
  region,
});

const uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucketName,
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

exports.uploadS3 = uploadS3;

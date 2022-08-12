const authJwt = require("../middleware/verifyJwtToken");
const LeadsController = require("../controllers/LeadsController");
const VerifyProduct = require("../middleware/verifyProduct");

const multer = require("multer");
const multerS3 = require("multer-s3");
const upload = multer({ dest: "uploads/" });

// const accessKeyId = "AKIA3BJRUBRVE2C4HQXN";
// const secretAccesskey = "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";

// const aws = require('aws-sdk');

// const s3 = new aws.S3({
//   accessKeyId,
//   secretAccesskey
// });

// //AWS file config
// const uploadS3 = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: "basigo-challenge",
//     acl: "public-read",
//     metadata: function (req, file, cb) {
//       cb(null, { fieldName: file.fieldname });
//     },
//     key: function (req, file, cb) {
//       cb(null, file.originalname);
//     },
//   }),
// });

// const { uploadFile } = require("../s3");

//Lead routes
module.exports = function (app) {
  app.post(
    "/api/leads/create",
    [authJwt.verifyToken, VerifyProduct.checkIfProductExists],
    upload.single("photo"),
    LeadsController.createLead
  );

  app.get(
    "/api/leads/all",
    [authJwt.verifyToken],
    LeadsController.listAllLeads
  );

  app.get(
    "/api/leads/view/:id",
    [authJwt.verifyToken],
    LeadsController.fetchLeadDetails
  );
};

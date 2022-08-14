const authJwt = require("../middleware/verifyJwtToken");
const LeadsController = require("../controllers/LeadsController");
const VerifyProduct = require("../middleware/verifyProduct");
const { uploadS3 } = require("../s3");

//Lead routes
module.exports = function (app) {
  app.post(
    "/api/leads/create",
    [authJwt.verifyToken, VerifyProduct.checkIfProductExists],
    uploadS3.single("photo"),
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

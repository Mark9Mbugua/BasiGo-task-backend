const authJwt = require("../middleware/verifyJwtToken");
const LeadsController = require("../controllers/LeadsController");

//Lead routes
module.exports = function (app) {
  app.post(
    "/api/leads/create",
    [authJwt.verifyToken],
    LeadsController.createLead
  );

  app.get("/api/leads/all", [authJwt.verifyToken], LeadsController.listAllLeads);

  app.get(
    "/api/leads/view/:id",
    [authJwt.verifyToken],
    LeadsController.fetchLeadDetails
  );
};

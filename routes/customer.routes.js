const authJwt = require("../middleware/verifyJwtToken");
const CustomersController = require("../controllers/CustomersController");

//Customer routes
module.exports = function (app) {
  app.get(
    "/api/customers/all",
    [authJwt.verifyToken],
    CustomersController.listAllCustomers
  );

  app.get(
    "/api/customers/view/:leadId",
    [authJwt.verifyToken],
    CustomersController.fetchCustomerDetails
  );
};

const authJwt = require("../middleware/verifyJwtToken");
const ProductsController = require("../controllers/ProductsController");

//Product routes
module.exports = function (app) {
  app.post(
    "/api/products/create",
    [authJwt.verifyToken],
    ProductsController.createProduct
  );

  app.get(
    "/api/products/all",
    [authJwt.verifyToken],
    ProductsController.listAllProducts
  );

  app.get(
    "/api/products/view/:id",
    [authJwt.verifyToken],
    ProductsController.fetchProductDetails
  );
};

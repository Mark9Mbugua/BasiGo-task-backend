const config = require("../config/secrets.config");
const PRODUCTS = config.PRODUCT;

const productVerify = {
  checkIfProductExists: (req, res, next) => {
    if (req.body.products) {
      for (let i = 0; i < req.body.products.length; i++) {
        if (!PRODUCTS.includes(req.body.product.toUpperCase())) {
          res.json({
            success: "false",
            message: "Specified product does not exist",
          });
          return;
        }
      }
    }
    next();
  },
};

module.exports = productVerify;

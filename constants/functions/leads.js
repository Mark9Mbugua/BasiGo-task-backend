const db = require("../../models/index.js");

const { uploadFile } = require("../../s3");

/* Handle Customer Details */
exports.HANDLE_CUSTOMER_DETAILS = async (
  leadId,
  photo,
  annualEarning,
  product
) => {
  const newCustomer = await db.customers.create({
    leadId,
    photo: photo.location,
    annualEarning,
  });

  await newCustomer.setProducts(product);
};

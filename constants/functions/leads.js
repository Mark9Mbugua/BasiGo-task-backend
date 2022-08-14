const db = require("../../models/index.js");

const { uploadFile } = require("../../s3");

/* Handle Customer Details */
exports.HANDLE_CUSTOMER_DETAILS = async (leadId, photo, annualEarning, product) => {
  // const result = await uploadFile(photo);

  // if (product && product.id === 1) {
  //   // product.id 1 = Product A
  //   console.log("This is Product A");
  // } else if (product && product.id === 2) {
  //   // product.id 2 = Product B
  //   console.log("This is Product B");
  // } else {
  //   // product.id 3 = Product C
  //   console.log("This is Product C");
  // }
  // await newLead.setProducts(product);

  const newCustomer = await db.customers.create({
    leadId,
    photo: photo.location,
    annualEarning,
  });

  await newCustomer.setProducts(product);
};

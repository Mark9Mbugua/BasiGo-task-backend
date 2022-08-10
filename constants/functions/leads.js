const db = require("../../models/index.js");

const { uploadFile } = require("../../s3");

/* Handle Customer Details */
exports.HANDLE_CUSTOMER_DETAILS = async (leadId, photo, annualEarning) => {
  console.log(photo);
  const result = await uploadFile(photo);

  await db.customers.create({
    leadId,
    photo: result,
    annualEarning,
  });
};

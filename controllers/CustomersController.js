const db = require("../models/index.js");

/**
 * Fetch a single customer by id
 * @param {*} req
 * @param {*} res
 */
exports.fetchCustomerDetails = async (req, res) => {
  try {
    const { leadId } = req.params;
    const existingLead = await db.leads.findOne({
      where: { id: Number(leadId), type: 1 },
      include: [{ model: db.customers }, { model: db.user }],
    });
    if (!Boolean(existingLead)) {
      return res.json({
        success: false,
        message: "Customer does not exist!",
      });
    }
    res.json({
      success: true,
      message: "Customer retrived successfully",
      data: existingLead,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "An error occured!" });
  }
};

/**
 * List All Customers
 * @param {*} req
 * @param {*} res
 */
exports.listAllCustomers = async (req, res) => {
  try {
    let total = await db.leads.count({ where: [{ type: 1 }] });
    const leads = await db.leads.findAll({
      where: [{ type: 1 }],
      order: [["createdAt", "DESC"]],
    });
    res.json({
      success: true,
      message: "Fetched All Customers!",
      data: { leads, total },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "An error occured!" });
  }
};
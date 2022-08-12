const db = require("../models/index.js");
const { HANDLE_CUSTOMER_DETAILS } = require("../constants/functions/leads");

/**
 * Creates a new tDeal
 * @param {*} req
 * @param {*} res
 */
exports.createLead = async (req, res) => {
  const { type, name, phone, location, gender } = req.body;
  try {
    const newLead = await db.leads.create({
      userId: req.userId,
      type: Number(type),
      name,
      phone,
      location,
      gender,
    });

    // Save Customer details
    if (type == 1) {
      console.log(type);
      const photo = req.file;

      if (req.body.products) {
        const productName = req.body.products;
        console.log("Product Names", productName);

        const product = await db.products.findAll({
          where: {
            name: productName,
          },
        });
        console.log("Product", product);

        await HANDLE_CUSTOMER_DETAILS(
          newLead.id,
          photo,
          req.body.annualEarning,
          product
        );
      }
    }

    res.json({
      success: true,
      message: "Lead created successfully",
      data: newLead,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "An error occured!" });
  }
};

/**
 * Fetch a single lead by id
 * @param {*} req
 * @param {*} res
 */
exports.fetchLeadDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const existingLead = await db.leads.findOne({
      where: { id: Number(id), type: 0 },
      include: [{ model: db.user }],
    });
    if (!Boolean(existingLead)) {
      return res.json({
        success: false,
        message: "Lead does not exist!",
      });
    }
    res.json({
      success: true,
      message: "Lead retrived successfully",
      data: existingLead,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "An error occured!" });
  }
};

/**
 * List All Leads
 * @param {*} req
 * @param {*} res
 */
exports.listAllLeads = async (req, res) => {
  try {
    let total = await db.leads.count();
    const leads = await db.leads.findAll({
      where: [{ type: 0 }],
      order: [["createdAt", "DESC"]],
      include: [{ model: db.user }],
    });
    res.json({
      success: true,
      message: "Fetched All Leads!",
      data: { leads, total },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "An error occured!" });
  }
};

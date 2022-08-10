const db = require("../models/index.js");

/**
 * Creates a new tDeal
 * @param {*} req
 * @param {*} res
 */
exports.createLead = async (req, res) => {
  const { name, phone, location, gender } = req.body;
  try {
    const newLead = await db.leads.create({
      userId: req.userId,
      name,
      phone,
      location,
      gender,
    });
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
      where: { id: Number(id) },
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
    const leads = await db.leads.findAll({ order: [["createdAt", "DESC"]] });
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

const db = require("../models/index.js");
const { HANDLE_CUSTOMER_DETAILS } = require("../constants/functions/leads");

/**
 * Creates a new lead
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
        /*
        products are stringified on the client so and to enable them to be persisted into the DB
        as arrays since the data object is in the multipart/form-data format. As a result testing this
        endpoint on postman will return an error but works on the client side
        */
        const productName = JSON.parse(req.body.products);

        //user the function below while testing with postman or any other similar platform
        // const productName = req.body.products;

        const product = await db.products.findAll({
          where: {
            name: productName,
          },
        });
        console.log("Product bana", product);

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
      include: [
        {
          model: db.user,
          include: [
            {
              model: db.role,
            },
          ],
        },
      ],
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
      include: [
        {
          model: db.user,
          include: [
            {
              model: db.role,
            },
          ],
        },
      ],
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

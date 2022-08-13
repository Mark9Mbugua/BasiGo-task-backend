const db = require("../models/index.js");

/**
 * Creates a new product
 * @param {*} req
 * @param {*} res
 */
exports.createProduct = async (req, res) => {
  const { name, description } = req.body;
  try {
    const newProduct = await db.products.create({
      name,
      description,
    });

    res.json({
      success: true,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "An error occured!" });
  }
};

/**
 * Fetch a single product by id
 * @param {*} req
 * @param {*} res
 */
exports.fetchProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const existingProduct = await db.products.findOne({
      where: { id: Number(id) },
    });
    if (!Boolean(existingProduct)) {
      return res.json({
        success: false,
        message: "Product does not exist!",
      });
    }
    res.json({
      success: true,
      message: "Product retrived successfully",
      data: existingProduct,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "An error occured!" });
  }
};

/**
 * List All Product
 * @param {*} req
 * @param {*} res
 */
exports.listAllProducts = async (req, res) => {
  try {
    let total = await db.products.count();
    const leads = await db.products.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json({
      success: true,
      message: "Fetched All Products!",
      data: { leads, total },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "An error occured!" });
  }
};

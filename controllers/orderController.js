const orderModel = require("../model/order");
const productModel = require("../model/product");

const createOrder = async (req, resp) => {
  try {
    const { customerID, products } = req.body;

    if (!customerID || !Array.isArray(products) || products.length === 0) {
      return resp
        .status(400)
        .json({ message: "customerId and products are required" });
    }
    let totalAmount = 0;

    for (const items of products) {
      const productfind = await productModel.findById(items.productId);

      if (!productfind) {
        return resp.status(400).json({ message: "Product not found" });
      }

      totalAmount += productfind.price * items.quantity;
    }
    const orderObject = new orderModel({ customerID, products, totalAmount });
    await orderObject.save();

    resp.status(201).json({ message: "Order created successfully" });
  } catch (error) {
    console.log(error);
    resp.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = { createOrder };

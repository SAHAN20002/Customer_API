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

const findOrder = async (req,resp) =>{
  try{
    const {searchText='',page=0,size=10} = req.query;
    const search = searchText ?{name:{$regex:searchText,$options:'i'}}:{};
    const orders = await orderModel.find(search).skip(page*size).limit(size);
    const count = await orderModel.countDocuments(search);
    resp.status(200).json({message:'Orders fetched successfully',datalist:orders,datacount:count});

  }catch(error){
    console.log(error);
    resp.status(500).json({message:'Internal server error'});
  }
};

const findOrderById = async(req,resp) =>{
    try{
      const {id} = req.params;
      const order = await orderModel.findById(id);
        if(!order){
            return resp.status(404).json({message:'Order not found'});
        }
        resp.status(200).json({message:'Order fetched successfully',data:order});
    }catch(error){
        console.log(error);
        resp.status(500).json({message:'Internal server error'});
    }
};
module.exports = { createOrder, findOrder, findOrderById };

const { model } = require('mongoose');
const customerModele = require('../model/customer');
const orderModel = require('../model/order');
const productModel = require('../model/product');

const getOrdersByCustomerId = async(req,resp) =>{
 try{
   
   const {customerID} = req.params; 
  
   const orders = await orderModel.find({customerID:customerID});
   console.log('Orders:', orders);
    if(!orders){
        return resp.status(400).json({message:'Orders not found'});
    }
    resp.status(200).json({message:'Orders fetched successfully',data:orders});
    console.log('Fetched orders:', orders);
 }catch(error){
        console.log(error);
        resp.status(500).json({message:'Internal server error'});
 }
};

const getOrderByDate = async(req,resp) =>{
    try{
      const {date} = req.params;
      const paserDate = new Date(date);

      if(isNaN(paserDate)){
        return resp.status(400).json({message:'Invalid date'});
      };

     const nextDate = new Date(paserDate);
     nextDate.setDate(nextDate.getDate()+1);

        const orders = await orderModel.find({date:{$gte:paserDate,$lt:nextDate}});

        if(!orders){
            return resp.status(400).json({message:'Orders not found'});
        }
        resp.status(200).json({message:'Orders fetched successfully',data:orders});
        console.log('Fetched orders:', orders);
    }catch(error){
        console.log(error);
        resp.status(500).json({message:'Internal server error'});

    }
};

const getTotalRevenueDate = async(req,resp) =>{
try{
 const {date} = req.params;
 const paserDate = new Date(date);

    if(isNaN(paserDate)){
        return resp.status(400).json({message:'Invalid date'});
    };

    const nextDate = new Date(paserDate);
    nextDate.setDate(nextDate.getDate()+1);

    const revnue = await orderModel.aggregate([
        {$match:{date:{$gte:paserDate,$lt:nextDate}}},
        {$group:{_id: null, total: {$sum: '$totalAmount'}}}
    ]);
    if(!revnue){
        return resp.status(400).json({message:'Revenue not found'});
    }
    resp.status(200).json({message:'Revenue fetched successfully',data:revnue});


}catch(error){
    console.log(error);
    resp.status(500).json({message:'Internal server error'});
}    
};

const getMostFrequentProduct = async(req,resp) =>{
 try{
    const products = await orderModel.aggregate([
        {$unwind:'$products'},
        {$group:{_id:'$products.productId',count:{$sum:'$products.quantity'}}},
        {$sort:{count:-1}},
        {$limit:1}
    ]);

    if(!products){
        return resp.status(400).json({message:'Products not found'});
    }
    const product = await productModel.findById(products[0]._id);
    resp.status(200).json({message:'Product fetched successfully',data:product});
    console.log('Fetched product:', product);
 } catch(error){
        console.log(error);
        resp.status(500).json({message:'Internal server error'});
 }
};

const getOutofStockProducts = async(req,resp) =>{
    try{
     const products = await productModel.find({quantity:0});
        if(!products){
            return resp.status(400).json({message:'Products not found'});
        }
        if(products.length===0){
            return resp.status(400).json({message:'No out of stock products'});
        }
        resp.status(200).json({message:'Products fetched successfully',data:products});
    }catch(error){
        console.log(error);
        resp.status(500).json({message:'Internal server error'});
    }
};

module.exports = {getOrdersByCustomerId,getOrderByDate,getTotalRevenueDate,getMostFrequentProduct,getOutofStockProducts};
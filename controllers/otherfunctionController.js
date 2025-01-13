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

module.exports = {getOrdersByCustomerId,getOrderByDate};
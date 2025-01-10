const customerModel = require('../model/customer');

const createCustomer = async (req,resp) =>{
  try{
    const {name,email,phone} = req.body;
    const findCustomer = await customerModel.findOne({email:email});
    if(findCustomer){
       return resp.status(400).json({message:'Customer already exists'});
    }
    const customerObject = new customerModel({name,email,phone});
    const customer = await customerObject.save();
    if(!customer){
       return resp.status(400).json({message:'Customer not created'});
    }
    resp.status(201).json({message:'Customer created successfully',customer});
  } catch(error){
    console.log(error);
    resp.status(500).json({message:'Internal server error'});
  }
}

const findCustomer = async (req,resp) =>{
  try{
    const{searchText='',page=0,size=10} = req.query;
    const serach = searchText ?{name:{$regex:searchText,$options:'i'}}:{};
    const customers = await customerModel.find(serach).skip(page*size).limit(size);
    const count = await customerModel.countDocuments(serach);
    resp.status(200).json({message:'Customers fetched successfully',datalist:customers,datacount:count});
  } catch(error){
    console.log(error);
    resp.status(500).json({message:'Internal server error'});
  }
}

module.exports = {createCustomer,findCustomer};
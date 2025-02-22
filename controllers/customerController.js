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

const findCustomerById = async(req,resp) =>{
try{
    const {id} = req.params;
    const customer = await customerModel.findById(id);
    if(!customer){
       return resp.status(400).json({message:'Customer not found'});
    }
    resp.status(200).json({message:'Customer find successfully',data:customer});

}catch(error){
    console.log(error);
    resp.status(500).json({message:'Internal server error'});
}
}

const updatedCustomer = async(req,resp) =>{
    try{
     const {id} = req.params;
     const {name,email,phone} = req.body;

     const customerupdated = await customerModel.findByIdAndUpdate(id,{name,email,phone},{new:true});
        if(!customerupdated){
            return resp.status(400).json({message:'Customer not updated'});
        }
        resp.status(200).json({message:'Customer updated successfully',data:customerupdated});
    }catch(error){
        console.log(error);
        resp.status(500).json({message:'Internal server error'});
    }
}

const deleteCustomer = async(req,resp) =>{
    try{
     const {id} = req.params;
     const customerdeleted = await customerModel.findByIdAndDelete(id);
     if(!customerdeleted){
        return resp.status(400).json({message:'Customer not deleted'});
     }
        resp.status(200).json({message:'Customer deleted successfully',data:customerdeleted});
    }catch(error){
        console.log(error);
        resp.status(500).json({message:'Internal server error'});
    }
}

module.exports = {createCustomer,findCustomer,findCustomerById,updatedCustomer,deleteCustomer};
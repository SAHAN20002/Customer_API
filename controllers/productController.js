const productModel = require('../model/product');

const createProduct = async (req,resp) =>{
    try{
        const {name,price,stock} = req.body;
        const findProduct = await productModel.findOne({name:name});
        if(findProduct){
            return resp.status(400).json({message:'Product already exists'});
        }
        const productObject = new productModel({name,price,stock});
        const product = await productObject.save();
        if(!product){
            return resp.status(400).json({message:'Product not created'});
        }
        resp.status(201).json({message:'Product created successfully',product});

    }catch(error){
        console.log(error);
        resp.status(500).json({message:'Internal server error'});
    }
}

const findProduct = async (req,resp) =>{
    try{
        const{searchText='',page=0,size=10} = req.query;
        const search = searchText ?{name:{$regex:searchText,$options:'i'}}:{};
        const products = await productModel.find(search).skip(page*size).limit(size);
        const count = await productModel.countDocuments(search);
        resp.status(200).json({message:'Products fetched successfully',datalist:products,datacount:count});
    }catch(error){
        console.log(error);
        resp.status(500).json({message:'Internal server error'});
    }
}

const findProductById = async(req,resp) =>{
    try{
        const {id} = req.params;
        const product = await productModel.findById(id);
        if(!product){
            return resp.status(404).json({message:'Product not found'});
        }
        resp.status(200).json({message:'Product fetched successfully',data:product});
    }catch(error){
        console.log(error);
        resp.status(500).json({message:'Internal server error'});   
    }    
}

const updatedProduct = async(req,resp) =>{
    try{
        const {id} = req.params;
        const {name,price,stock} = req.body;
        const productupdated = await productModel.findByIdAndUpdate(id,{name,price,stock},{new:true});
        if(!productupdated){
            return resp.status(400).json({message:'Product not updated'});
        }
        resp.status(200).json({message:'Product updated successfully',data:productupdated});
    }catch(error){
        console.log(error);
        resp.status(500).json({message:'Internal server error'});
    }
}

const deleteProduct = async(req,resp) =>{
    try{
        const {id} = req.params;
        const product = await productModel.findByIdAndDelete(id);
        if(!product){
            return resp.status(400).json({message:'Product not deleted'});
        }
        resp.status(200).json({message:'Product deleted successfully',data:product});
    }catch(error){
        console.log(error);
        resp.status(500).json({message:'Internal server error'});
    }
}

module.exports = {createProduct,findProduct,findProductById,updatedProduct,deleteProduct};
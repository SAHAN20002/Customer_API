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
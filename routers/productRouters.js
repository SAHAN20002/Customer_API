const express = require('express');
const ProductRouter = express.Router();
const productController = require('../controllers/productController');

ProductRouter.post('/create',productController.createProduct);
ProductRouter.get('/find',productController.findProduct);
ProductRouter.get('/find-by-id/:id',productController.findProductById);
ProductRouter.put('/update-by-id/:id',productController.updatedProduct);
ProductRouter.delete('/delete-by-id/:id',productController.deleteProduct);
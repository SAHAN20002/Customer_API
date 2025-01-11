const express = require('express');
const ProductRouter = express.Router();
const productController = require('../controllers/productController');

ProductRouter.post('/create',productController.createProduct);
ProductRouter.get('/find',productController.findProduct);
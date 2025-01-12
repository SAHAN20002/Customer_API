const express = require('express');
const OrderRouter = express.Router();
const orderController = require('../controllers/orderController');

OrderRouter.post('/create',orderController.createOrder);
OrderRouter.get('/find',orderController.findOrder);
OrderRouter.get('/find-by-id/:id',orderController.findOrderById);
// OrderRouter.delete('/delete-by-id/:id',orderController.deleteOrder);

module.exports = OrderRouter;
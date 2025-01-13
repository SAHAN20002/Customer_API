const express = require('express');
const otherFunctionsRouter = express.Router();
const otherFunctionsController = require('../controllers/otherfunctionController');

otherFunctionsRouter.get('/get-orders-by-customer-id/:customerID',otherFunctionsController.getOrdersByCustomerId);
otherFunctionsRouter.get('/get-orders-by-date/:date',otherFunctionsController.getOrderByDate);
otherFunctionsRouter.get('/get-total-revenue-date/:date',otherFunctionsController.getTotalRevenueDate);
otherFunctionsRouter.get('/most-ordered-product',otherFunctionsController.getMostFrequentProduct);
otherFunctionsRouter.get('/get-out-of-stock-products',otherFunctionsController.getOutofStockProducts);

module.exports = otherFunctionsRouter;
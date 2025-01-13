const express = require('express');
const otherFunctionsRouter = express.Router();
const otherFunctionsController = require('../controllers/otherfunctionController');

otherFunctionsRouter.get('/get-orders-by-customer-id/:customerID',otherFunctionsController.getOrdersByCustomerId);
otherFunctionsRouter.get('/get-orders-by-date/:date',otherFunctionsController.getOrderByDate);
otherFunctionsRouter.get('/get-total-revenue-date/:date',otherFunctionsController.getTotalRevenueDate);

module.exports = otherFunctionsRouter;
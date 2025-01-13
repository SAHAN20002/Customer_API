const express = require('express');
const otherFunctionsRouter = express.Router();
const otherFunctionsController = require('../controllers/otherfunctionController');

otherFunctionsRouter.get('/get-orders-by-customer-id/:customerID',otherFunctionsController.getOrdersByCustomerId);
otherFunctionsRouter.get('/get-orders-by-date/:date',otherFunctionsController.getOrderByDate);

module.exports = otherFunctionsRouter;
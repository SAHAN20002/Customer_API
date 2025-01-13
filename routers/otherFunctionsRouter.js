const express = require('express');
const otherFunctionsRouter = express.Router();
const otherFunctionsController = require('../controllers/otherfunctionController');

otherFunctionsRouter.get('/get-orders-by-customer-id/:customerID',otherFunctionsController.getOrdersByCustomerId);

module.exports = otherFunctionsRouter;
const express = require('express');
const CustomerRouter = express.Router();
const customerController = require('../controllers/customerController');

CustomerRouter.post('/create',customerController.createCustomer);
CustomerRouter.get('/find',customerController.findCustomer);
CustomerRouter.get('/find-by-id/:id',customerController.findCustomerById);


module.exports = CustomerRouter;
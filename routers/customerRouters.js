const express = require('express');
const CustomerRouter = express.Router();
const customerController = require('../controllers/customerController');

CustomerRouter.post('/create',customerController.createCustomer);
CustomerRouter.get('/find',customerController.findCustomer);
CustomerRouter.get('/find-by-id/:id',customerController.findCustomerById);
CustomerRouter.put('/update-by-id/:id',customerController.updatedCustomer);


module.exports = CustomerRouter;
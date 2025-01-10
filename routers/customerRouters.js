const express = require('express');
const CustomerRouter = express.Router();
const customerController = require('../controllers/customerController');

CustomerRouter.post('/create',customerController.createCustomer);

module.exports = CustomerRouter;
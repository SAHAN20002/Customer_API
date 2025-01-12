const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    products:[
        {
          productId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
          },
          qunatity:{
                type: Number,
                required: true
                
          }
        }
    ],
    totalAmount:{
        type: Number,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
    
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
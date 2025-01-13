const express = require('express');
const mongoose = require('mongoose');
const routerCustomer = require('./routers/customerRouters');   
const routerProduct = require('./routers/productRouters');
const routerOrder = require('./routers/orderRouter');
const routerOtherFunctions = require('./routers/otherFunctionsRouter');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config(); 

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect(MONGO_URI).then(()=>{
  console.log('Database connected');
}).catch((error=>{
    console.log(error);
}))

app.use('/customer',routerCustomer);
app.use('/product',routerProduct);
app.use('/order',routerOrder);
app.use('/other',routerOtherFunctions);

app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`));

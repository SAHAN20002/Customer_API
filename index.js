const express = require('express');
const mongoose = require('mongoose');
const routerCustomer = require('./routers/customerRouters');   
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

app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`));

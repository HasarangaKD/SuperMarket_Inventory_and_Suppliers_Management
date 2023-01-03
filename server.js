const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const app = express();

const PORT = process.env.DB_URL || 8000;


//import routes
const stockRoutes = require('./routes/stock');
const supplierRoutes = require('./routes/supplier');
const inventoryRoutes = require('./routes/inventory');


//app middleware
app.use(bodyParser.json());
app.use(cors()); 
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({extended: false}));

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}


//route middleware
app.use(stockRoutes);
app.use(supplierRoutes);
app.use('/inv', inventoryRoutes);

/*
const DB_URL ='mongodb+srv://Hasaranga:197512kdh@mernproject1.wqywa.mongodb.net/supermarket_db?retryWrites=true&w=majority'
*/
const DB_URL = process.env.MONGODB_URL

mongoose.connect(DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
   .then(() =>{
        console.log('Database Connected');
    })

    .catch((err) => console.log('DB connection error',err));


// Catch errors that go beyond the above routes
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

// Passes direct errors
app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});    

app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`)
  })
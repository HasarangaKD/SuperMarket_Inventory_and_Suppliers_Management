const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({

    StockType:{
        type:String,
        required:true
    },
    SupplierID:{
        type:String,
        required:true
    },
    SupplierName:{
        type:String,
        required:true
    },                
    DateOfReceived:{
        type:String,
        required:true
    },
    
    
});

module.exports = mongoose.model('Stocks',stockSchema)
const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({

    SupplierName:{
        type:String,
        required:true
    },
    SupplierCat:{
        type:String,
        required:true
    },        
    SupplierCompany:{
        type:String,
        required:true
    },
    ContactNumber: {
        type: Number,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    
});

module.exports = mongoose.model('Suppliers',supplierSchema)
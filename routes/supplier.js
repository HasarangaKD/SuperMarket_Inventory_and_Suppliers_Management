const express = require('express');
const Suppliers = require('../models/supplier');

const router = express.Router();

//save supplier details

router.post('/supplier/save',(req,res)=>{

    let newSupplier = new Suppliers(req.body);
    
    newSupplier.save((err) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Supplier details saved successfully"
        });
    });
});

//get supplier details

router.get('/supplier',(req,res)=>{
    Suppliers.find().exec((err,suppliers) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        } 
        return res.status(200).json({
            success:true,
            existingSuppliers:suppliers
        });
    });
    
});

//get specific supplier details
router.get("/supplier/:id",(req,res) =>{

    let supplierID = req.params.id;

    Suppliers.findById(supplierID,(err,suppliers) =>{
        if(err){
            return res.status(400).json({success:false, err});
            }
        
        return res.status(200).json({
            success:true,
            suppliers
        });
    });
    
});


//update supplier details

router.put('/supplier/update/:id',(req,res)=>{
    Suppliers.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,supplier) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Update Successfully"
        });
    });
});

//delete supplier

router.delete('/supplier/delete/:id',(req,res)=>{
    Suppliers.findByIdAndRemove(req.params.id).exec((err,deletedSupplier) =>{

    if(err) return res.status(400).json({
        message:"Delete unsuccessfull",err
    });

    return res.json({
        message:"Delete successfull",deletedSupplier
    
        });
    });
});
module.exports = router;
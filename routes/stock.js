const express = require('express');
const Stocks = require('../models/stock');

const router = express.Router();

//save stock details

router.post('/stock/save',(req,res)=>{

    let newStock = new Stocks(req.body);
    
    newStock.save((err) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Stock details saved successfully"
        });
    });
});

//get stock details

router.get('/stock',(req,res)=>{
    Stocks.find().exec((err,stocks) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        } 
        return res.status(200).json({
            success:true,
            existingStocks:stocks
        });
    });
    
});

//get specific stock details
router.get("/stock/:id",(req,res) =>{

    let stockID = req.params.id;

    Stocks.findById(stockID,(err,stocks) =>{
        if(err){
            return res.status(400).json({success:false, err});
            }
        
        return res.status(200).json({
            success:true,
            stocks
        });
    });
    
});


//update stock details

router.put('/stock/update/:id',(req,res)=>{
    Stocks.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,stock) =>{
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

//delete stock

router.delete('/stock/delete/:id',(req,res)=>{
    Stocks.findByIdAndRemove(req.params.id).exec((err,deletedStock) =>{

    if(err) return res.status(400).json({
        message:"Delete unsuccessfull",err
    });

    return res.json({
        message:"Delete successfull",deletedStock
    
        });
    });
});
module.exports = router;
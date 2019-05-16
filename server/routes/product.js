const express = require('express');

const { verifyToken } = require('../middlewares/authentication');

const app = express();

let Product = require('../models/product');


//=================================================
//   Get Products
//=================================================
app.get('/product',(req, res) => {
    let {skip} = req.query || 0;
    skip = Number(skip);
    let {limit} = req.query || 5;
    limit = Number(limit);
    Product.find({})
    .populate('category', 'description')
    .populate('user', 'name email')
    .skip(skip)
    .limit(limit)
    .exec((err, productDB) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            products: productDB
        });
    });
});

//=================================================
//   Get a Product for ID
//=================================================
app.get('/product/:id',(req, res) => {
    let { id } = req.params;

    Product.findById(id)
            .populate('category', 'description')
            .populate('user', 'name email')
            .exec((err, productDB) => { 
        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if(!productDB){
            return res.status(400).json({
                ok: false,
                err:{
                    message: 'Prodcut ID is invalid'
                }
            })
        }
        if(!productDB.aviable){
            return res.json({
                ok: false,
                err:{
                    message: 'The product was deleted'
                }
            })
        }
        res.json({
            ok: true,
            products: productDB
        });
    });
});

//=================================================
//   Search Products
//=================================================
app.get('/product/search/:term',(req, res) => {

    let { term } = req.params;
    let regex = new RegExp(term, 'i');

    Product.find({ name : regex})
    .populate('category', 'description')
    .exec((err, productDB) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            products: productDB
        });
    });
});

//=================================================
//   Crate a Product
//=================================================
app.post('/product',verifyToken, (req, res) => {
    let body = req.body;
    let product = new Product({
        name: body.name,
        pricingUni: body.pricingUni, 
        description: body.description, 
        aviable: body.aviable, 
        category: body.category, 
        user: req.user._id, 
    });

    product.save((err, productDB)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }
        res.status(201).json({
            ok: true, 
            product: productDB
        })
    });
});

//=================================================
//   Put a Products
//=================================================
app.put('/product/:id', verifyToken, (req, res) => {
    let id = req.params.id;
    let body = req.body;

    Product.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, productDB) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if(!productDB){
            return res.status(400).json({
                ok: false,
                err:{
                    message: 'Product id invalid'
                }
            });
        }
        res.json({
            ok: true,
            product: productDB
        });
    });
});

//=================================================
//   Delete a Products
//=================================================
app.delete('/product/:id', verifyToken, (req, res) => {
    let id = req.params.id;

    Product.findByIdAndUpdate(id, { aviable : false }, { new : true, runValidators: true }, (err, productDB) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if(!productDB){
            return res.status(400).json({
                ok: false,
                err:{
                    message: 'Product id invalid'
                }
            });
        }
        res.json({
            ok: true,
            product: productDB,
            message: 'Product deleted'
        });
    });
    
});

module.exports = app;
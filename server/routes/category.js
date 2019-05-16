const express = require('express');

let { verifyToken, verifyAdminRole } = require('../middlewares/authentication');

const app = express();

const Category = require('../models/category');

//=================================================
//   Show categories
//=================================================
app.get('/category', (req,res) => {
    Category.find({})
    .populate('user', 'name email')
    .sort('description')
    .exec((err, categoriesDB) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categories : categoriesDB
        })
    });
});

//=================================================
//   Show a Category for ID
//=================================================

app.get('/category/:id', (req,res) =>{
    const id = req.params.id;
    Category.findById(id).exec((err, categoryDB) => {
        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            category : categoryDB
        })
    });
});

//=================================================
//   Create new Category
//=================================================

app.post('/category', verifyToken, (req,res) => {
    let body = req.body;

    let category = new Category({
        description: body.description,
        user: req.user._id
    });

    category.save( (err, categoryDB) =>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }

        if(!categoryDB){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok:true,
            category: categoryDB
        });
    });
});

//=================================================
//   Put Ctegory
//=================================================

app.put('/category/:id', verifyToken, (req,res) => {
    let id = req.params.id;    
    let body = req.body;   
    
    Category.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, categoryDB) =>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }

        if(!categoryDB){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok:true,
            category: categoryDB
        });
    })
});

//=================================================
//   Delete Ctegory
//=================================================

app.delete('/category/:id', [verifyToken, verifyAdminRole], (req,res) => {
    let id = req.params.id;    
    let body = req.body;   
    
    Category.findOneAndRemove(id, body, (err, categoryDB) =>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        if(!categoryDB){
            return res.status(400).json({
                ok: false,
                err:{
                    message: 'Id invalid'
                }
            })
        }

        res.json({
            ok:true,
            message: 'Deleted category'
        });
    });
});

module.exports = app;
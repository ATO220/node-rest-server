const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const _ = require('underscore');
const { verifyToken, verifyAdminRole } = require('../middlewares/authentication');

const app = express();

// GET User
app.get('/user', verifyToken, (req,res) => {

    let skip = req.query.skip || 0;
    skip = Number(skip);
    let limit = req.query.limit || 5;
    limit = Number(limit);
    
    User.find({estado:true}, 'name email estado role google img')
        .skip(skip)
        .limit(limit)
        .exec((err, users) => {
            if(err){
                return res.status(400).json({
                    ok:false,
                    err
                });
            }
            
            User.count({estado:true}, (err,count) => {
                if(err){
                    return res.status(400).json({
                        ok:false,
                        err
                    });
                }

                res.json({
                    ok:true,
                    users,
                    count
                });                
            })

        });
});

// POST User
app.post('/user', [verifyToken, verifyAdminRole], (req,res) => {
    let body = req.body;

    let user = new User({
        name: body.name,
        email: body.email,
        role: body.role,
        password: bcrypt.hashSync(body.password, 10)  
    });

    user.save( (err, userDB) =>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        res.json({
            ok:true,
            user: userDB
        });
    });
});

//  PUT User
app.put('/user/:id', [verifyToken, verifyAdminRole], (req,res) => {
    let body = _.pick(req.body,['name','email','img','role','estado']);
    let id = req.params.id; 

    User.findByIdAndUpdate( id, body, { new : true, runValidators: true }, (err, userDB) =>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }

        res.json({
            ok: true,
            user: userDB
        });
    })
    
});
app.delete('/user/:id', [verifyToken, verifyAdminRole], (req,res) => {
    let id = req.params.id;
    let changeStatus = { estado:false};
    User.findByIdAndUpdate(id, changeStatus,{new:true}, (err, userDB) =>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            });
        }
        if(!userDB){
            return res.status(400).json({
                ok:false,
                err: {
                    message: 'User not found'
                }
            });
        }

        res.json({
            ok: true,
            user: userDB
        });
    })
});

module.exports = app;
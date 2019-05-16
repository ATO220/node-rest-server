const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let validRoles = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
};

let userSchema = new Schema({
    name:{
        type: String,
        required: [true, 'The name is required']
    },
    email:{
        type: String,
        unique: true,
        required: [true, 'The email is required']
    },
    password:{
        type: String,
        required: [true, 'The password is required']
    },
    img:{
        type: String
    },
    role:{
        type: String,
        default: 'USER_ROLE',
        enum: validRoles
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }

});

userSchema.methods.toJSON = function(){
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

userSchema.plugin( uniqueValidator, { message: '{PATH} debe de ser unico'});
module.exports = mongoose.model( 'User', userSchema, 'User');
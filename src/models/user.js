const mongoose = require('mongoose');
//Mongoose error handler unique validator for when unique field already exists in the DB
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const userSchema = new Schema({
        name: {
            type: String,
            required: [true, 'Name required']
        },
        lastName: {
            type: String,
            required: [true, 'Last name required']
            
        },
        email: {
            type: String,
            required: [true, 'Email required'],
            unique: true,
            // To make the search via email faster
            index: true
        },
        birthDay: Date,
        password: {
            type: String,
            required: [true, 'Password required']
        },
        role: {
            type: String,
            required: true,
            default: 'USER_ROLE',
            enum: ['USER_ROLE', 'ADMIN_ROLE']
        },
        enable: {
            type: Boolean,
            required: true,
            default: true
        }
    },
    {timestamps: true} // To know the date of creation or modification
);

userSchema.plugin(uniqueValidator, {message: 'already exists in the DB'});
userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('users', userSchema) // Create the collection in mongodb with the name 'users' using the userSchema
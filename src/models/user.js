const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
        name: String,
        lastName: String,
        email: String,
        birthDay: Date,
    },
    {timestamps: true} // To know the date of creation or modification
);

module.exports = mongoose.model('users', userSchema) // Create the collection in mongodb with the name 'users' using the userSchema
const mongoose = require('mongoose')
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
        unique:true,
        minlength:10,
        maxLength:10
    },
    type: {
        type: String,
        required: true,
        default:'student'
    },
    date: {
        type: Date,
        default: Date.now
    }
})
const User = mongoose.model('user', UserSchema);
User.createIndexes()
module.exports = User
const mongoose = require('mongoose')
const { Schema } = mongoose;
const Items=require('./Items')
const CartSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    item_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'menu',
    },
    quantity: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('cart', CartSchema)
const mongoose = require('mongoose')
const { Schema } = mongoose;

const OrdersSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required:true
    },
    status: {
        type: String,
        required:true,
        default:'Ordered'
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('orders', OrdersSchema)
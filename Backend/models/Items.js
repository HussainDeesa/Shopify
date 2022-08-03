const mongoose = require('mongoose')
const { Schema } = mongoose;

const ItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required:true
    },
    image:{
        type:String
    },
    category:{
        type:String
    }
   
})

module.exports = mongoose.model('items', ItemSchema)
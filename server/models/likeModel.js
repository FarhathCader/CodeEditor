const mongoose = require('mongoose')
const likeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },  
    })

module.exports = mongoose.model('Like',likeSchema)
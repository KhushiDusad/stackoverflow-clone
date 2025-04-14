const mongoose = require('mongoose')
const questionSchema = new mongoose.Schema({
    title: String,
    body: String,
    tags: [],
    created_at:{
        type: Date,
        default: Date.now
    },
    user: Object
})

module.exports = mongoose.model("Questions", questionSchema);
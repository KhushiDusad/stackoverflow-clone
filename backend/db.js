const mongoose = require('mongoose')

const uri = //mongodb cluster uri

module.exports.connect = () =>{
    mongoose.connect(uri).then((res)=>console.log("MongoDB connected successfully")).catch((err)=>console.log("Error: ", err))
}


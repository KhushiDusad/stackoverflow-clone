const mongoose = require('mongoose')

const uri ="mongodb+srv://Khushi:Khushi534@cluster0.tmfczui.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

module.exports.connect = () =>{
    mongoose.connect(uri).then((res)=>console.log("MongoDB connected successfully")).catch((err)=>console.log("Error: ", err))
}


const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 80
const path = require('path')
const db = require('./db')
const router = require('./routers')
require('dotenv').config()
const app = express()
//db connection
db.connect();

//middleware
app.use(cors())
app.use(bodyParser.json({limit:"50mb"}))
app.use(bodyParser.urlencoded({extended: true, limit: "50mb"}))
app.use(express.json())

//headers
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin',"*")
    res.header('Access-Control-Allow-Headers','*')
    next()
})

//api
app.use('/api', router)



//static resources
app.use('/upload',express.static(path.join(__dirname, '/../uploads')))
app.use(express.static(path.join(__dirname, "/../frontend/build")))

app.get("/{*any}", (req, res) => {         
  try {
    res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
  } catch (e) {
    res.send("An error occured");
  }
});



//server listen
app.listen(PORT, ()=>{
    console.log(`mini stackoverflow is running on port no. ${PORT}`)
})
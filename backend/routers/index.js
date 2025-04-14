const express = require('express')
const router = express.Router()
const questionRouter = require('./Question')
const answerRouter = require("./Answer");

router.get('/', (req, res)=>{
    res.send('hello working')
})

router.use('/question', questionRouter)
router.use('/answer', answerRouter)

module.exports = router;
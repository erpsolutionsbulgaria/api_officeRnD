// const express = require('express'),
//  app = express

const app = require('express')();

const accountRoutes = require('./routes/account')

require('dotenv').config()

app.use('/account', accountRoutes)

// app.get('/', (req, res)=> {
//     res.send('hello')
// })

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`Listening on Port: ${PORT}`)
})

module.exports = app
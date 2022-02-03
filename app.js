// const express = require('express'),
//  app = express

const app = require('express')();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const accountRoutes = require('./routes/account')

require('dotenv').config()

app.use(bodyParser.urlencoded({
    extended: false
}))
//connect to mongodb
// const dbURI = 'mongodb+srv://kitodorovAdmin:100Kilatashaci@Cluster0.6c3aq.mongodb.net/Cluster0?retryWrites=true&w=majority'
// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    // .then((result) => console.log('connected to db'))
    // .catch((err)=>console.log(err))

app.use('/account', accountRoutes)

// app.get('/', (req, res)=> {
//     res.send('hello')
// })

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`Listening on Port: ${PORT}`)
})

module.exports = app
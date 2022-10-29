// Imports
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routers/routers')
require('dotenv').config();

const port = process.env.PORT || 4000 ;

// Middleware
const app = express();
app.use(express.json());
// app.use(cookieParser())
const db_url = process.env.MONGO_URL

mongoose.connect(db_url).then(()=>{
    console.log('database connected')
    app.listen(port, ()=>{
        res.send('server running');
        app.use('/blogs', router)
    })
}).catch(err=>console.log(err));


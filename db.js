const mongoose = require('mongoose');
const uri = process.env.DB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if(!err){
     console.log('Connection to users DB successful...')
    } else {
        console.log('Error in DB connection:' + err)
    }
})
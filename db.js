const mongoose = require('mongoose');
const uri = "mongodb+srv://Adehenry:Adehenry%401@cluster0.up9zn.mongodb.net/users?retryWrites=true&w=majority"
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if(!err){
     console.log('Connection to users DB successful...')
    } else {
        console.log('Error in DB connection:' + err)
    }
})
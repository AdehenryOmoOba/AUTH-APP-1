if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

require('./db')
const usersController = require('./controls')
const express = require('express');
const app = express();
const session = require('express-session');
const MongoDbSession = require('connect-mongodb-session')(session)
const uri = "mongodb+srv://Adehenry:Adehenry%401@cluster0.up9zn.mongodb.net/users?retryWrites=true&w=majority"
const storeSession = new MongoDbSession({uri: uri, collection: "user"})


app.use(express.urlencoded({extended: false}))
app.use(session({secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false, store: storeSession}))
app.use('/', usersController)
app.set('view engine', 'ejs')
app.use('/public', express.static('public'))





app.listen(5900, () => {
    console.log('Server running on port: 5900')
})
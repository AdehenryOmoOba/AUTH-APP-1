const express = require('express');
const router = express.Router()
const userModel = require('./models/usermodel')
const bCrypt = require('bcryptjs')





router.get('/', (req, res) => {
    res.render('landing')
})

router.get('/login', (req, res) => {
return  res.render('login', {passwMsg: "", emailMsg: ""})
      
})

router.post('/login', async (req, res) => {
    const {email, password} = req.body
    console.log(email, password)
    const user = await userModel.findOne({email});
    if(!user){
      let invalidPasswdMsg = "";
      let invalidEmailMsg = 'Email not found!';
      console.log(invalidEmailMsg)
      return  res.render('login' , {emailMsg: invalidEmailMsg, passwMsg:invalidPasswdMsg})
    }

    const isMatch =  await bCrypt.compare(password, user.password)
     
    if (!isMatch){
       let invalidPasswdMsg = 'Password is invalid!';
       let invalidEmailMsg = "";
       console.log(invalidPasswdMsg)
       return  res.render('login', {passwMsg: invalidPasswdMsg, emailMsg: invalidEmailMsg})
      
       
    } 
        req.session.isAuth = true
        res.redirect('/dashboard')
        console.log('log in successful...')
    
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', async (req, res) => {
    const {username,email, password} = req.body
    console.log(username,email, password)
    let user = await userModel.findOne({email});
    let hashedPassword = await bCrypt.hash(password, 10)
    if (user){
        return res.redirect('/register')
    } else {
        user = new userModel({
            username,
            email,
            password: hashedPassword
        })
    }

    await user.save();

    res.redirect('/login')

})

const isAuth = (req, res, next) => {
    if (req.session.isAuth){
        next();
   } else {
       res.redirect('/login')
    }
   }

router.get('/dashboard', isAuth, (req, res) => {
    res.render('dashboard')
})

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err){
            throw err
        } else {
            res.redirect('/')
        }
    })
   
})

module.exports = router
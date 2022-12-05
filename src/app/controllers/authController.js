const express = require ('express');
const User = require ('../models/user')
const funcionario = require('../models/funcionario')
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth.json')
const crypto = require('crypto')
const mailer = require('../../modules/mailer')


function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret,{
        expiresIn:86400,
    })
}

router.post('/register', async (req,res)=>{
   const {email} = req.body
   
    try{
        if(await User.findOne({email})) return res.status(400).send({error: "Email já cadastrado"})
        const user = await User.create(req.body);
        user.password = undefined

        return res.send({user,token:generateToken({id: user.id})
        });
    }catch(err){
        res.status(400).send({error: "Registration failed"})
    }
})

router.post('/authenticate', async (req, res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email}).select('+password');

    if(!user)
    return res.status(400).send({error:'User not found'})

    if(!await bcrypt.compare(password, user.password))
    return res.status(400).send({error:'Invalid password'});

    user.password = undefined

    res.send({
        user,
        token:generateToken({id: user.id}),
    });
});

router.post('/forgot_password', async (req,res)=>{
    const { email } = req.body;
    try{
        const user = await User.findOne({email});


        if(!user)
        return res.status(400).send({error:'User not found'})

        const token = crypto.randomBytes(20).toString('hex');

        const now = new Date();
        now.setHours(now.getHours()+ 1);
        
        await User.findByIdAndUpdate(user.id,{
            '$set':{
                passwordResetToken:token,
                passwordResetExpires:now,
            }
        })
    
        mailer.sendMail({
            to: email,
            from:'lucas.neri121@hotmail.com',
            subject:"Recuperar senha",
            html:'<h1 style="font-family: Arial, Helvetica, sans-serif;color:gray;">Voçê esqueceu sua senha ? nao tem problema ultilize esse token:'+token+'</h1>',
            context:{ token },
        },(err)=>{
            if(err){
                console.log(err)
                return res.status(400).send({error:'Cannot send forgot password email.'})}

            
            return res.send();
        })
    }catch(err){
        console.log(err)
        res.status(400).send({error: 'Error on forgot password,try again'})
    }
})

router.post('/reset_password',async (req,res)=>{
    const { email,token, password} = req.body

try {
    const user = await User.findOne({email})
    .select('+passwordResetToken passwordResetExpires');


    if(!user)
        return res.status(400).send({error:'User not found'});

    
    if(token !== user.passwordResetToken)
        return res.status(400).send({error:'Token invalid'});  
    

    const now = new Date();

    if(now > user.passwordResetExpires)
        return res.status(400).send({error:'token expired, generate a new one'});
        

    user.password = password;
    await user.save();
    res.send('senha alterada');

} catch (error) {
    res.status(400).send({error:'cannot reset password, try again'})
}




})


router.post('/home',async(req,res)=>{
    res.send('Deu Certo')    
})
router.post('/addfunc',async (req,res)=>{
    try{
        const fun = await funcionario.create(req.body);    
        return res.send(fun)
    }catch(err){
        console.log(err)
    }
})

router.post('/funcionarios',async (req,res)=>{
   const {emailDoUsuario} = req.body
    try{
        if(await funcionario.find({emailDoUsuario}) == emailDoUsuario)
            res.send()
        
    }catch(e){console.log(e)}
    
});




module.exports = app => app.use('/auth',router)
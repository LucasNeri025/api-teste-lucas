const express = require('express')
const authMiddleware = require('../middlewares/auth');
const Funcionario = require('../models/funcionario');


const router = express.Router();

router.use(authMiddleware);

//     Cria Funcionario
router.post('/', async (req,res)=>{
    try{
        const funcionario = await Funcionario.create({...req.body, user: req.userId });

        return res.send({funcionario});
    }catch(e){
        return res.status(400).send({error:'Error creating new employee'});
    }

});

//     Edita Funcionario
router.put('/:funcionarioId', async (req,res)=>{
    try{
        const funcionario = await Funcionario.findByIdAndUpdate(req.params.funcionarioId, req.body,{new:true});

        return res.send({funcionario});
    }catch(e){
        return res.status(400).send({error:'Error updating new project'});
    }
})

//     busca os Funcionario
router.get('/', async (req,res)=>{
    try{
        const funcionarios = await Funcionario.find({'user':req.userId});

        return res.send({ funcionarios })
    }catch(e){
        return res.status(400).send({error:'Error loading employee'})
    }
})

//     busca um Funcionario
router.get('/:funcionarioId', async (req,res)=>{
    try{
        const funcionarios = await Funcionario.findById(req.params.funcionarioId).populate(['user']);

        return res.send({ funcionarios })
    }catch(e){
        return res.status(400).send({error:'Error loading employeesss'})
    }
})

//     busca um Funcionario
router.delete('/:funcionarioId', async (req,res)=>{
    try{
        await Funcionario.findByIdAndRemove(req.params.funcionarioId);

        return res.send()
    }catch(e){
        return res.status(400).send({error:'Error deleting project'})
    }
})

module.exports = app => app.use('/fun',router);
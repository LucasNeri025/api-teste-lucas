const mongoose = require ('../../database/index.js')

const UserSchema = new mongoose.Schema({
    nameFunc:{
        type:String,
        require:true,
    },
    cpfFunc:{
        type:String,
        require:true,
    },
    rgFunc:{
        type:String,
        require:true,
    },
    cargoFunc:{
        type:String,
        require:true,
    },
    dataInicioFunc:{
        type:Date,
        require:true,
    },
    nisFunc:{
        type:String,
        require:true,
    },
    endereçoFunc:{
        type:String,
        require:true, 
    },
    cidadeFunc:{
        type:String,
        require:true,
    },
    emailDoUsuario:{
        type:String,
        require:true,
    },
});

const Funcionario = mongoose.model('Funcionario', UserSchema);

module.exports = Funcionario;
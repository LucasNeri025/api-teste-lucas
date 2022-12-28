require('dotenv').config();
const mongoose = require ('mongoose')

mongoose.connect(process.env.CONNECTIONSTRING,
{useUnifiedTopology:false})
.then(console.log("Conectou ao BD"))
.catch( e => console.log(e))

mongoose.Promise = global.Promise;
module.exports = mongoose;
const mongoose = require ('mongoose')

mongoose.connect('mongodb+srv://lucasneri:vanda121@crud-cadastro.zm6sxlz.mongodb.net/BASEDEDADOS?retryWrites=true&w=majority',
{useUnifiedTopology:false})
.then(console.log("yes"))
.catch( e => console.log(e))

mongoose.Promise = global.Promise;
module.exports = mongoose;
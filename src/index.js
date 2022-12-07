const express = require ('express');
const bodyParser = require ('body-parser');
const port = process.env.PORT || 3000;
const cors = require('cors')
const app = express();


app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Methods","GET,PUT,POST,DELETE")
    app.use(cors());
    next()
})



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


require('./app/controllers/index')(app);


app.listen(port, function (){
    console.log(port)
})
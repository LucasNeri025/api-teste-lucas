require('dotenv').config();
const express = require ('express');
const bodyParser = require ('body-parser');
const port = process.env.PORT || 3000;
const cors = require('cors')
const app = express();

const option = cors.CorsOptions = {
    methods:"GET,PUT,POST,DELETE",
    origin:"*"
}
    
app.use(cors(option))


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


require('./app/controllers/index')(app);


app.listen(port, function (){
    console.log(port)
})
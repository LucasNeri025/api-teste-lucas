const express = require ('express');
const bodyParser = require ('body-parser');
const port = process.env.PORT || 3000;
const cors = require('cors')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

require('./app/controllers/index')(app);


app.listen(port, function (){
    console.log(port)
})
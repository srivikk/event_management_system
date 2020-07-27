const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
var session = require('express-session');


const apiRoute = require("./routes/api-routes");
const index = require("./routes/index");

const app = express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', index);
app.use('/api', apiRoute);

app.listen(3000,()=>{
    console.log("Server is running on port 3000!");
});
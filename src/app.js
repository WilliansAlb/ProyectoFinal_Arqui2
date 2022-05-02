const express = require("express");
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const session = require("express-session");

app.use(session({
	secret: '51770390',
	resave: true,
	saveUninitialized: true
}));

app.use('/favicon.ico', express.static(path.join(__dirname, 'public/img/favicon.ico')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/img', express.static(path.join(__dirname, 'public/img')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));

app.set('views', './src/views');
app.set('view engine', 'pug');

//rutas
app.use(require('./routes/routes'));

module.exports = app;
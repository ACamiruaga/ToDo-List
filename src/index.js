//EXPRESS
const express = require('express');
const morgan = require('morgan');
const rutas = require('./routes/routes');
const mongoose = require('mongoose');

const App = express();
mongoose.connect('mongodb://localhost/dbTest').then( db=>
{
    console.log("DB connected");
}).catch( err=> console.log(err) );

//Settings
App.set('port', process.env.PORT || 3000);
//App.set('views', __dirname + '/views');

//Middleware
App.use(morgan('dev'));
App.use(express.json());

//static files
App.use( express.static(__dirname + "/public") );

//Routes
App.use(rutas); //Tambien se puede poner un atributo al principio ej. App.use('/task', rutas ); y cuando se acceda se ira por defecto a localhost:3000/task/{algo-mas}

App.listen(App.get('port'), ()=> console.log("Servidor escuchando en el puerto " + App.get('port')));

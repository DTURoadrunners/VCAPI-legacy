var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),  
  models = require('./api/models'),
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.connect('mongodb://178.62.5.59/roadrunnersDB', { useMongoClient: true })


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/routes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);
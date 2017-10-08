var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),  
  models = require('./api/models'),
  config = require('./config')
  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.connect(config.database, { useMongoClient: true })


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


/* ####### ROUTE CONFIG ####### */
// router config
var openRouter = express.Router();
var secureRouter = express.Router();


var routes = require('./api/routes/routes'); //importing route
var secureRoutes = require('./api/routes/secureRoutes'); //importing route
routes(openRouter); //register the route
secureRoutes(secureRouter); //register secure route

app.use('/api', openRouter);
app.use('/api', secureRouter);
/* ####### ROUTE CONFIG END ####### */

app.listen(port);


console.log('todo list RESTful API server started on: ' + port);
// DEPENDENCIES
var exphbs = require('express-handlebars');
var express = require('express');
var connection = require('./config/connection.js');

var app = express();

var PORT = process.env.PORT || 8080;

// MIDDLEWARE
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// HANDLEBARS TEMPLATE
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// ROUTES
var routes = require('./routes/routes.js');
app.use(routes);

// SERVER
app.listen(PORT, function() {
  console.log(`Server listening on PORT: ` + PORT);
});

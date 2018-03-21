const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

/* Example of Custom Middleware
var logger = function(req, res, next){
    console.log('Logging...');
    next();
}

app.use(logger);
*/

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set Static Path
app.use(express.static(path.join(__dirname, 'public')));

/* Example of parsing json
var people = [
  {
    name: 'Jeff',
    age: 30
  },
  {
    name: 'Sarah',
    age: 52
  },
  {
    name: 'Melinda',
    age: 20
  }
]

app.get('/', function(req, res){
  res.json(people);
});
*/

var users = [
  {
    first_name: 'John',
    last_name: 'Smith',
    email: 'johnsmith@gmail.com',
    id: 1
  },
  {
    first_name: 'Mary',
    last_name: 'Jane',
    email: 'maryjane@gmail.com',
    id: 2
  },
  {
    first_name: 'Lisa',
    last_name: 'Kudrow',
    email: 'lisakudrow@gmail.com',
    id: 3
  }
]

app.get('/', function(req, res){
  var title = 'Customers';
  res.render('index', {
    title: 'Customers',
    users: users
  });
});

app.listen(3000, function(){
  console.log('Server started on Port 3000...');
})

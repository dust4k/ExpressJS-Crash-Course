const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressValidator = require('express-validator');
const mongojs = require('mongojs');
var db = mongojs('customerapp', ['users']);
var ObjectId = mongojs.ObjectId;

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

// Global Vars
app.use(function(req, res, next){
  res.locals.errors = null;
  next();
});

// Express validator middleware
app.use(expressValidator());

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

/* Example of creating a users array of objects
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
*/

app.get('/', function(req, res){
  db.users.find(function (err, docs) {
    res.render('index', {
      title: 'Customers',
      users: docs
    });
  })
});

app.post('/users/add', function(req, res){
  req.checkBody('first_name', 'First Name is required').notEmpty();
  req.checkBody('last_name', 'Last Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();

  var errors = req.validationErrors();

  if(errors) {
    db.users.find(function (err, docs) {
      res.render('index', {
        title: 'Customers',
        users: docs
      });
    })
  } else {
    var newUser = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email
    }

    db.users.insert(newUser, function(err, result) {
      if(err) {
        console.log(err);
      }
      res.redirect('/');
    });

    console.log('SUCCESS');
  }
})

app.delete('/users/delete/:id', function(req, res) {
  db.users.remove({_id: ObjectId(req.params.id)}, function(err, result){
    if (err) {
      console.log(err);
    }
    res.redirect('/');
  });
})

app.listen(3000, function(){
  console.log('Server started on Port 3000...');
})

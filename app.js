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

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set Static Path
app.use(express.static(path.join(__dirname, 'public')));

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

app.listen(3000, function(){
  console.log('Server started on Port 3000...');
})

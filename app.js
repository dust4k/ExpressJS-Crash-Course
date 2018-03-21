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

app.get('/', function(req, res){
  res.send('Hello World!');
});

app.listen(3000, function(){
  console.log('Server started on Port 3000...');
})

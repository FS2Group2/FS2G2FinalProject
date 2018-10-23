var proxy = require('express-http-proxy');

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 8080));

app.use('/', express.static('peddle-webapp/build'));
app.use('/', proxy('http://ec2-54-175-183-245.compute-1.amazonaws.com:9000'));

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
var express = require('express');
var bodyParser = require('body-parser');
var compression = require('compression');

var webapp = express();
var morgan = require('morgan'); // log every request. https://github.com/expressjs/morgan

// morgan - predefined formats: combined, common, dev, short, tiny. eg. webapp.use(morgan('dev'));
webapp.use(morgan(':remote-addr [:date[clf]] :status ":method :url" :response-time ms - :res[content-length]'));
webapp.use(compression());

// parse application/x-www-form-urlencoded
webapp.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
// parse application/json
webapp.use(bodyParser.json({ limit: '50mb' }));

webapp.use(express.static(__dirname + '/www'));

// CORS
webapp.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'OPTIONS, HEAD, GET, POST, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

var port = process.env.PORT || 8888;
webapp.listen(port, function () {
  console.log('Web app listening on port ' + port + '.');
});

webapp.get('/favicon.ico', function (req, res) {
  res.sendStatus(204); // res.status(204);
});

webapp.get('/api/hi', function (req, res) {
  res.json({ hi: 'Hello World!', params: req.params, query: req.query, body: req.body });
});

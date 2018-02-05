const express = require('express');
var session = require('express-session')
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const cors = require('cors');
let morgan = require('morgan');

app.use(morgan('dev'));
app.use(cors());
app.use(session({secret : "uneverno"}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/QandA/dist'))

require('./server/config/mongoose.js')
require('./server/config/routes.js')(app)

const server = app.listen(7000, function(){console.log("Listening on port 7000")})

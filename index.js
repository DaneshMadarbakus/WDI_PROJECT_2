const express    = require('express');
const morgan     = require('morgan');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
// const expressJWT = require('express-jwt');
const port       = process.env.PORT || 3000;
// const secret     = process.env.SECRET || 'this is secret';
const routes     = require('./config/routes.js');
const cors       = require('cors');
const app = express();

const databaseURL = process.env.MONGOLAB_URL || 'mongodb://localhost:27017/photos';
mongoose.connect(databaseURL);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(cors());
app.use('/', routes);

app.listen(port, console.log(`app is listening on ${port}`));

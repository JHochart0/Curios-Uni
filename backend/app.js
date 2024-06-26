const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

app.use(express.static('public'));

const app = express();

app.set('view engine', 'ejs');
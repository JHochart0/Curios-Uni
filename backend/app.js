// all libraries requires
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

// routes requires
const authRoutes = require('./routes/authRoutes');

// express instanciation
const app = express();

// view engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));

//middlewares and static files
app.use(express.static('public'));
app.use(express.json());

//init mongoose
require("./controllers/mongoose_init");

// Routing
app.use('/', authRoutes);
app.get('*', (req, res)=>{
    res.render('index', {title:"accueil"});
});

module.exports = app;
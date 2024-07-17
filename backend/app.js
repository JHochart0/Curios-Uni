// all libraries and files requires
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const {_, checkCurrentUser} = require('./middlewares/authMiddleware');
require("./controllers/mongoose_init");

// routes requires
const authRoutes = require('./routes/authRoutes');
const curiosityRoutes = require('./routes/curiosityRoutes');

// express instanciation
const app = express();

// view engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));

//middlewares and static files
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(checkCurrentUser); // middleware to check who is currently connected


// Routing
app.use('/', authRoutes);
app.use('/', curiosityRoutes);

app.get('*', (req, res)=>{
    res.render('404', {title:"Page non trouvée", stylesheet: "404"});
});

module.exports = app;
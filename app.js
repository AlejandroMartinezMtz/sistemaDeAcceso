const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');




//Connect to Mongo
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const passport = require('passport');


// Passport config
require('./config/passport')(passport);


//DB Config
// Cargar variables de entorno
dotenv.config();

// Conectar a MongoDB
connectDB();


const app = express();


//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs')

// Bodyparser
app.use(express.urlencoded({extended: false}));


//Express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));


// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


// Connect flash
app.use(flash());

// Global Vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

//Routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));


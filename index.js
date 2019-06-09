var path = require('path');
var express = require('express');
var http = require('http');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash')

const app = express()
const port = 3000

// mongoose
mongoose.connect('mongodb://localhost/passport_local_mongoose',{useNewUrlParser:true});

app.set('view engine', 'pug')
app.set('views', path.join(__dirname,"views"));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser(secret='manit_cse_yesalam'))
app.use(session({ 
    secret: 'manit_cse_yesalam', 
    saveUninitialized: false,
    resave: false, 
    store: new MongoStore({ mongooseConnection: mongoose.connection,
                            ttl: 14 * 24 * 60 * 60 })       
    }))
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

require('./passport')


// routes
require('./routes')(app);

app.listen(port, () => console.log(`app listening on port ${port}!`))
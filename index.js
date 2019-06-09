var path = require('path');
var express = require('express');
var http = require('http');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash')

const app = express()
const port = 3000

app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser(secret='manit_cse_yesalam'))
app.use(session({ secret: 'manit_cse_yesalam', cookie: { maxAge: 60000 }}))
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

require('./passport')

// mongoose
mongoose.connect('mongodb://localhost/passport_local_mongoose',{useNewUrlParser:true});

// routes
require('./routes')(app);

app.listen(port, () => console.log(`app listening on port ${port}!`))
var passport = require('passport');
var Account = require('./models/account');

module.exports = function (app) {

  app.get('/', function (req, res) {
      res.render('index', {user : req.user });
  });

  app.get('/new',isLoggedIn, function(req, res){
    res.render('new', { user : req.user });
  });

  app.get('/my',isLoggedIn, function(req, res){
    res.render('my', { user : req.user });
  });

  app.get('/register', function(req, res) {
      res.render('register', { message:req.flash('signupMessage')[0]});
  });

  app.post('/register', passport.authenticate('local-signup',{
    successRedirect:'/home',
    failureRedirect:'/register',
    failureFlash:true
  }));

  app.get('/home',isLoggedIn,function(req,res){
    res.render('home', { user : req.user });
  });

  app.post('/home',isLoggedIn,function(req,res){
    res.render('home', { user : req.user });
  });

  app.all('/test',function(req,res){
      res.render('test',{ message : req.flash('loginMessage')[0],user : req.user });
  });

  app.get('/login', function(req, res) {
      res.render('login', { message : req.flash('loginMessage')[0],user : req.user });
  });

  app.post('/login', passport.authenticate('local-login',
                        {successRedirect:'/home',
                         failureRedirect:'/login',
                         failureFlash:true,
                        }));

  app.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
  });

  app.get('/ping', function(req, res){
      res.send("pong!", 200);
  });

  function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
      return next();
  }
  res.render('login',{message: 'OPPS ! Log In please'});
  }
  
  

};



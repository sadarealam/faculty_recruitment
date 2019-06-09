var passport = require('passport');
var Account = require('./models/account');

module.exports = function (app) {

  app.get('/', function (req, res) {
      res.render('index', {user : req.user });
  });

  app.get('/register', function(req, res) {
    console.log(req.flash('signupMessage'))
      res.render('register', { message:req.flash('signupMessage')});
  });

  app.post('/register', passport.authenticate('local-signup',{
    successRedirect:'/home',
    failureRedirect:'/register',
    failureFlash:true
  }));

  app.get('/home',isLoggedIn,function(req,res){
    res.render('index', { user : req.user });
  });

  app.post('/home',isLoggedIn,function(req,res){
    res.render('index', { user : req.user });
  });

  app.get('/test',function(req,res){
      res.render('test',{});
  });

  app.get('/login', function(req, res) {
      console.log(req.flash('loginMessage'))
      res.render('login', { message:req.flash('loginMessage'),user : req.user });
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
  res.redirect('/');
  }
  
};



var passport = require('passport');
var Account = require('./models/account');
var Application = require('./models/application');
var Application1 = require('./models/application1');
var Application2 = require('./models/application2');
var Application3 = require('./models/application3');
var Application4 = require('./models/application4');
var Credit = require('./models/credit');
var Const = require('./const');

module.exports = function (app) {

  app.get('/', function (req, res) {
    res.render('index', { user: req.user });
  });

  app.get('/new', isLoggedIn, function (req, res) {
    res.render('new', { user: req.user });
  });

  app.get('/my', isLoggedIn, function (req, res) {
    var email = req.user.username;
    Application.find({ email: email }, function (err, applications) {
      if (err) console.log('Error in finding applications');
      if (applications) res.render('my', { user: req.user, applications: applications })
      //res.render('my', { user : req.user });
    });

  });

  app.post('/createnew', isLoggedIn, function (req, res) {
    var user = req.user;
    var adv_no = req.body.advertisement_no;
    var department = req.body.department;
    var post_applied_for = req.body.post_applied_for;
    Application.findOne({
      email: user.username,
      adv_no: adv_no,
      department: department,
      post_applied_for: post_applied_for
    }, function (err, application) {
      if (err) console.log('Error is finding applications');
      if (application) res.render('new', { message: 'This application is already created.', user: req.user });
      else {
        Application.countDocuments({}, function (err, count) {
          if (err) console.log('Error in counting applications');
          var application = new Application();
          application.adv_no = adv_no;
          application.email = user.username;
          application.no = post_applied_for + department + count;
          application.department = department;
          application.post_applied_for = post_applied_for;
          application.status = 'Pending';
          application.department_full = Const.departments()[department];
          application.post_applied = Const.posts()[post_applied_for];
          console.log(application.department);
          application.save(function (err) {
            if (err) console.log('Error in creating application');
            res.redirect('/my');
          })
        });
      }
    })
  });

  app.post('/application', isLoggedIn, function(req, res){
    var action = req.body.action;
    var no = req.body.no;
    var user = req.user;
    res.redirect('/application1?no='+no)
  });

  //this is danegorous. remove it
  app.get('/application1', isLoggedIn, function(req, res){
    var action = req.query.action;
    var no = req.query.no;
    var user = req.user;
    console.log(req.body);
    if (!no) res.redirect('/my');
    var query = {'username': user.username, 'no':no};  
    Application1.findOne(query, req.body,function(err, application1){
      if (err) {
        console.log(err);
        res.render('application', {no: no,user: user,action: action,message:'Opps something wrong. ask help',application:application1});
      }
      else  res.render('application',{user: user,no:no,action:action,application:application1})
    });
    
  });

  app.post('/application1', isLoggedIn, function(req, res){
    var action = req.body.action;
    var no = req.body.no;
    var user = req.user;    
    console.log(req.body);
    if (!no) res.redirect('/my');
    var query = {'username': user.username, 'no':no};  
    Application1.findOneAndUpdate(query, req.body, {upsert:true}, function(err, application1){
      if (err) {
        console.log(err);
        res.render('application', {no: no,user: user,action: action,message:'Opps something wrong. ask help',application:application1});
      }
      else res.redirect('/application2?no='+no+'&action='+action);  
    });
    
  });

  //this is danegorous. remove it
  app.get('/application2', isLoggedIn, function(req, res){
    var action = req.query.action;
    var no = req.query.no;
    var user = req.user;
    if (!no) res.redirect('my');
    var query = {'username': user.username, 'no':no};  
    Application2.findOne(query, req.body,function(err, application2){
      if (err) {
        console.log(err);
        res.render('application2', {no: no,user: user,action: action,message:'Opps something wrong. ask help',application2:application2});
      }
      else  res.render('application2',{user: user,no:no,action:action,application2:application2})
    });
    
  });

  app.post('/application2', isLoggedIn, function(req, res){
    var action = req.body.action;
    var no = req.body.no;
    var user = req.user;
    console.log(req.body);
    if (!no) res.redirect('my');
    var query = {'username': user.username, 'no':no};  
    Application2.findOneAndUpdate(query, req.body, {upsert:true}, function(err, application2){
      if (err) {
        console.log(err);
        res.render('application2', {no: no,user: user,action: action,message:'Opps something wrong. ask help',application2:application2});
      }
      else res.redirect('/application3?no='+no+'&action='+action);  
    });
  });

  //this is danegorous. remove it
  app.get('/application3', isLoggedIn, function(req, res){
    var action = req.query.action;
    var no = req.query.no;
    var user = req.user;
    if (!no) res.redirect('my');
    var query = {'username': user.username, 'no':no};  
    Application3.findOne(query, req.body,function(err, application3){
      if (err) {
        console.log(err);
        res.render('application3', {no: no,user: user,action: action,message:'Opps something wrong. ask help',application3:application3});
      }
      else  res.render('application3',{user: user,no:no,action:action,application3:application3})
    });
  });

  app.post('/application3', isLoggedIn, function(req, res){
    var action = req.body.action;
    var no = req.body.no;
    var user = req.user;
    console.log(req.body);
    if (!no) res.redirect('my');
    var query = {'username': user.username, 'no':no};  
    Application3.findOneAndUpdate(query, req.body, {upsert:true}, function(err, application3){
      if (err) {
        console.log(err);
        res.render('application3', {no: no,user: user,action: action,message:'Opps something wrong. ask help',application3:application3});
      }
      else res.redirect('/application4?no='+no+'&action='+action);
    });
  });

   //this is danegorous. remove it
   app.get('/application4', isLoggedIn, function(req, res){
    var action = req.query.action;
    var no = req.query.no;
    var user = req.user;
    if (!no) res.redirect('/my');
    var query = {'username': user.username, 'no':no};  
    Application4.findOne(query, req.body,function(err, application4){
      if (err) {
        console.log(err);
        res.render('application4', {no: no,user: user,action: action,message:'Opps something wrong. ask help',application4:application4});
      }
      else  res.render('application4',{user: user,no:no,action:action,application4:application4})
    });
  });

  app.post('/application4', isLoggedIn, function(req, res){
    var action = req.body.action;
    var no = req.body.no;
    var user = req.user;
    console.log(req.body);
    if (!no) res.redirect('/my');
    var query = {'username': user.username, 'no':no};  
    Application4.findOneAndUpdate(query, req.body, {upsert:true}, function(err, application4){
      if (err) {
        console.log(err);
        res.render('application4', {no: no,user: user,action: action,message:'Opps something wrong. ask help',application4:application4});
      }
      else res.redirect('/credit?no='+no+'&action='+action);  
    });
  });

 
  app.post('/credit',isLoggedIn, function(req,res){
    var action = req.body.action;
    var no = req.body.no;
    var user = req.user;    
    //console.log(req.body);
    res.redirect('/credit?no='+no);
    
  });


  app.get('/credit',isLoggedIn, function(req,res){
    var action = req.query.action;
    var no = req.query.no;
    var user = req.user;    
    //console.log(req.body);
    if (!no) res.redirect('/my');
    var query = {'username': user.username, 'no':no};  
    Credit.findOne(query, req.body,  function(err, credit){
      if (err) {
        console.log(err);
        res.render('credit', {no: no,user: user,action: action,message:'Opps something wrong. ask help'});
      }
      else res.render('credit',{no: no,user: user,action: action,credit: credit});   
    });
    
  });

  app.post('/submit',isLoggedIn, function(req,res){
    var action = req.body.action;
    var no = req.body.no;
    var user = req.user;    
    console.log(req.body);
    if (!no) res.redirect('/my');
    var query = {'username': user.username, 'no':no};  
    Credit.findOneAndUpdate(query, req.body, {upsert:true}, function(err, credit){
      if (err) {
        console.log(err);
        res.render('credit', {no: no,user: user,action: action,message:'Opps something wrong. ask help'});
      }
      else res.redirect('/my');  
    });
    
  });


  


  app.get('/register', function (req, res) {
    res.render('register', { message: req.flash('signupMessage')[0] });
  });

  app.post('/register', passport.authenticate('local-signup', {
    successRedirect: '/home',
    failureRedirect: '/register',
    failureFlash: true
  }));

  app.get('/home', isLoggedIn, function (req, res) {
    res.render('home', { user: req.user });
  });

  app.post('/home', isLoggedIn, function (req, res) {
    res.render('home', { user: req.user });
  });

  app.get('/test', function (req, res) {
    console.log(req.body);
    res.render('test', { message: req.flash('loginMessage')[0],test:'PI', user: req.user });
  });

  app.post('/test', function (req, res) {
    console.log(req.body);
    res.render('test', { message: req.flash('loginMessage')[0], user: req.user });
  });

  app.get('/login', function (req, res) {
    res.render('login', { message: req.flash('loginMessage')[0], user: req.user });
  });

  app.post('/login', passport.authenticate('local-login',
    {
      successRedirect: '/home',
      failureRedirect: '/login',
      failureFlash: true,
    }));

  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  app.get('/forgot',function(req,res){
res.send('<H2> We are Sorry );, We are building it</h2><h6> Come back again </h6>');
  });

  app.get('/ping', function (req, res) {
    res.send("pong!", 200);
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.render('login', { message: 'OPPS ! Log In please' });
  }



};



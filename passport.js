var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// passport config
var Account = require('./models/account');
//passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());
passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
},
    function (req, username, password, done) {
        process.nextTick(function () {
            Account.findOne({ 'username': username }, function (err, user) {
                if (err) return done(err);

                if (user)
                    return done(null, false, req.flash('signupMessage', 'The username already exists'));
                else {
                    var newUser = new Account();
                    newUser.username = username;
                    newUser.password = password;
                    newUser.name = req.body.name;

                    newUser.save(function (err) {
                        if (err) throw done(err);
                        return done(null, newUser);
                    });
                }
            });
        });
    }));
passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, username, password, done) {
    process.nextTick(function () {
        Account.findOne({ 'username': username }, function (err, user) {
            if (err) return done(err);
            if (!user) {
                console.log(req.flash);
                return done(null, false, req.flash('loginMessage', 'User does not exist'));
            }

            user.comparePassword(password, function (err, isMatch) {
                if (err) {
                    return done(err, false);
                }
                if (isMatch) {
                    return done(null, user);//{username: username});
                }
                return done(null, false, req.flash('loginMessage', 'Password is not correct'));
            });


        });
    });
}));
const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'Email'
},
    function (Email, Password, done) {
        //find a user and establish the identity
        User.findOne({ Email: Email }, function (err, user) {
            if (err) {

                console.log("error in fincding user --> Passport");
                return done(err);
            }
            console.log(user.Password)
            if (!user || user.Password != Password) {
                console.log("Invalid Username/Password");
                return done(null, false);
            }
            // c onsole.log('error')
            return done(null, user);
        });
    }
));


// serializing the user to decide which key is to be kept in the cookie:

passport.serializeUser(function (user, done) {
    done(null, user.id);
    // console.log(user.id);
})




//deserializing the user from the key in the cookie :

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log("error in finding user --> Passport")
            return done(err);
        }

        // console.log(user);
        return done(null, user);
    });
});


passport.checkAuthentication = function (req, res, next) {
    if (req.isAuthenticated) {
        return next();
    }


    return res.redirect('/users/sign-in');
}


passport.setAutenticate = function (req, res, next) {
    if (req.isAuthenticated()) {

        //req.user contain the current signin user from the session
        res.locals.user = req.user;
    }
    next();
}
module.exports = passport;




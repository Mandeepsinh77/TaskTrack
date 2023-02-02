const User = require('../models/user');

module.exports.profile = function (req, res) {
    if (req.cookies.user_id) {
        User.findById(req.cookies.user_id, function (err, user) {
            if (user) {
                return res.render('user_profile', {
                    title: "User Profile",
                    user: user
                })
            } else {
                return res.redirect('/users/sign-in')
            }
        });
    } else {
        return res.redirect('/users/sign-in');
    }
    // return res.render('user_profile', {
    //     title: 'User Profile'
    // })
}


//render the signUp page
module.exports.signUp = function (req, res) {
    return res.render("user_sign_up", {
        title: "Codeal | Sign Up"
    })
}



//render the signIn page
module.exports.signIn = function (req, res) {
    return res.render("user_sign_in", {
        title: "Codeial | Sign In"
    })
}


//get thr sign up data
module.exports.sign = function (req, res) {


    if (req.body.Password != req.body.Confirm_password) {
        console.log("Password are not match");
        return res.redirect('back');
    }

    User.findOne({ Email: req.body.Email }, function (err, user) {
        if (err) { console.log("error in fincding user in signing up"); return; }

        if (!user) {

            User.create({
                Fname: req.body.Fname,
                Lname: req.body.Lname,
                Email: req.body.Email,
                Password: req.body.Password,
                Confirm_password: req.body.Confirm_password
            }, function (err, newSignUp) {
                if (err) {
                    console.log("error in creating task list", err);
                    return;
                }
                return res.redirect('/users/sign-in');
            });
        }
        else {
            console.log("email is same")
            return res.redirect('back');
        }
    });
};



//get the sign In data 
module.exports.createSession = function (req, res) {

    //find the user

    User.findOne({ Email: req.body.Email }, function (err, user) {
        if (err) { console.log("error in finding user in signing in"); return; }
        //handle user found

        if (user) {
            // handle password which don't match

            if (user.Password != req.body.Password) {
                return res.redirect('back');
            }

            //handle session creation
            res.cookie('user_id', user.id);
            return res.redirect('/');

        } else {
            //handle user not found
            return res.redirect('back')
        }
    });





    // return res.redirect('/');



}
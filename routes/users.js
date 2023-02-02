const express = require("express");
const router = express.Router();
// const passport = require('passport');


const userController = require("../controllers/users_controller")
// const aboutController = require("../controllers/about_controller");
// const contactController = require("../controllers/contact_controller")
router.get("/profile", userController.profile);



router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);




router.post('/create', userController.sign);
router.post('/create-session', userController.createSession);



//use passport as a middleware to authenticate:

// router.post('/create-session', passport.authenticate(
//     'local',
//     { failureRedirect: '/users/sign-in' },
// ), userController.createSession)


// router.get("/about", aboutController.about);
// router.get("/contact", contactController.contact);
module.exports = router;
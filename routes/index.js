const express = require("express");
const router = express.Router();
// router.use(express.urlencoded());

const homeController = require('../controllers/home_controller');

// console.log("Router loaded");
router.get('/', homeController.home);
router.post('/create-task', homeController.task);
router.get('/delete-task', homeController.delete);


router.use('/users', require('./users'));


router.use('/uploads', require("./uploads"));


module.exports = router; 
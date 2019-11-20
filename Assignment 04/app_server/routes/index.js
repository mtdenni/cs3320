var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');

/* GET home page. */
router.get('/', ctrlMain.homepageController);
router.get('/about', ctrlMain.aboutController);
router.get('/login', ctrlMain.loginController);
router.get('/logout', ctrlMain.logoutController);
router.get('/register', ctrlMain.registerController);
router.get('/shipping', ctrlMain.shippingController);
router.get('/store', ctrlMain.storeController);
router.get('/account', ctrlMain.accountController);
router.get('/cart', ctrlMain.cartController);

module.exports = router;

var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');
var ctrlUsers = require('../controllers/users');
var mid = require('../middleware/index');

/* GET home page. */
router.get('/', ctrlMain.homepageController);
router.get('/about', ctrlMain.aboutController);
router
    .route('/login') 
    .get(mid.loggedOut, ctrlUsers.loginController)
    .post(ctrlUsers.processLogin);
router.get('/logout', ctrlUsers.logoutController);
router.route('/register')
    .get(ctrlUsers.registerController)
    .post(ctrlUsers.processRegistration);
router
    .route('/shipping')
    .get(ctrlMain.shippingController)
    .post(ctrlMain.processNewShippingInformation);

router
    .route('/store')
    .get(mid.requiresLogin, ctrlMain.storeController)
    .post(ctrlMain.processAddToCart);
router.get('/account', ctrlMain.accountController);
router
    .route('/cart')
    .get(mid.requiresLogin, ctrlMain.cartController)
    .post(mid.requiresLogin, ctrlMain.processOrder);
router.get('/deleteItem/:index', ctrlMain.deleteItem);
router.get('/payment', ctrlMain.payment);
router
    .route('/paymentMethod')
    .get(ctrlMain.paymentMethod)
    .post(ctrlMain.addPaymentMethod);

module.exports = router;

let sqlite = require('../models/db');
let db = sqlite.db;

const loginController = (req, res) => {
    res.render('login', {});
  };
  
const logoutController = (req, res) => {
    // Remove session information
    if (req.session) {
      // Delete session object
      req.session.destroy(function(err) {
        if(err) {
          return next(err);
        } else {
          // Send visitor back to homepage after log out
          return res.redirect('/');
        }
      });
    }
};

const processLogin = (req, res) => {
    let sql = `SELECT * FROM UserCredentials WHERE userName = '${req.body.userName}' AND pass = '${req.body.password}'`;
    db.all(sql, [], (err, user) => {
      if(err) {
        console.log('Error: ' + err);
      }
      if(user.length == 0) {
        res.render('login', { 
            error: 'Username or password is incorrect'
        })
      } else { 
        req.session.userName = user[0].userName;
        req.session.items = [];
        req.session.userId = user[0].userId;
        return res.redirect('/');
      }
    });
};

const registerController = (req, res) => {
    let sql = 'SELECT * FROM state';
    db.all(sql, [], (err, states) => {
      if (err) throw err;
      const data = {
        states
      };
      res.render('register', data);
    });
};

const processRegistration = (req, res) => {
    let sql = `INSERT INTO UserCredentials (userName, pass) VALUES ('${req.body.email}', '${req.body.password}')`;
    db.all(sql, [], (err, data) => {
        if(err) {
            console.log(err);
        }
        // Query for the newly created user to get the userId
        sql = `SELECT * FROM UserCredentials WHERE userName = '${req.body.email}'`;
        db.all(sql, [], (err, user) => {
            // Use the new userID and submitted form to populate UserInformation and ShippingInformation
            db.run(`INSERT INTO UserInformation (userId, fullname, address1, address2, city, state, zip)
                VALUES (
                    ${user[0].userId}, 
                    '${req.body.firstName} ${req.body.lastName}',
                    '${req.body.address1}',
                    '${req.body.address2}',
                    '${req.body.city}',
                    '${req.body.state}',
                    ${req.body.zipCode}
                    );`);
            db.run(`INSERT INTO ShippingInformation (userId, address1, address2, city, state, zip)
                VALUES (
                    ${user[0].userId}, 
                    '${req.body.address1}',
                    '${req.body.address2}',
                    '${req.body.city}',
                    '${req.body.state}',
                    ${req.body.zipCode}  
                );`);
            res.redirect('/login');
        });
    });
};

const accountController = (req, res) => {
    let sql = `SELECT * FROM OrderItems INNER JOIN Products ON OrderItems.productId = Products.productId INNER JOIN Orders ON OrderItems.orderNumber = Orders.OrderNumber WHERE Orders.userId = ${req.session.userId} ORDER BY Orders.orderNumber DESC`;
    db.all(sql, [], (err, accountInformation) => {
    
        let orderData = [];
        let orderNumber = 0; 
        let length = 0;

        accountInformation.forEach(order => {
            if (orderNumber != order.orderNumber) {
                orderNumber = order.orderNumber;
                orderData.push(order);
                length = orderData.length;
                orderData[length - 1].orderItems = [];
                orderData[length - 1].orderItems.push(order);
            } else {
                orderData[length -1].orderItems.push(order);
            }
        });
    
    const data = {
        orders: orderData
    }

    res.render('account', data);
    });
};

module.exports = {
      loginController,
      logoutController,
      processLogin,
      registerController,
      processRegistration,
      accountController
  };
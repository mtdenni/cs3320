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
    let sql = `SELECT * FROM UserCredentials WHERE userName = '${req.body.userName}'`;
    db.all(sql, [], (err, user) => {
      if(err) {
        console.log('Error: ' + err);
      }
      if(user.length == 0) {
        res.render('login', { 
            error: 'User or password is incorrect'
        })
      } else { 
        req.session.userName = user[0].userName;
        req.session.items = [];
        req.session.userId = user[0].userId;
        return res.redirect('/');
      }
    });
    // res.render('login', {});
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
        sql = `SELECT * FROM UserCredentials WHERE userName = '${req.body.email}'`;
        db.all(sql, [], (err, user) => {
            console.log(user);
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

  module.exports = {
      loginController,
      logoutController,
      processLogin,
      registerController,
      processRegistration,
  };
let sqlite = require('../models/db');
let db = sqlite.db;

const homepageController = (req, res) => {
  console.log(req.session);
  console.log(res.locals.userName);
  console.log(req.session.userName);
  res.render('index', {
    text:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis ducimus earum at nihil voluptatibus hic error, laborum commodi fugiat dolore sequi exercitationem ea aspernatur doloribus eius molestiae odio repudiandae a? Architecto ut numquam temporibus cupiditate illo a aut incidunt nisi corporis assumenda ab laborum voluptates, illum, labore dolore voluptatum quidem est iusto. Eum possimus fuga enim maiores a tempore vitae culpa at corporis eius nostrum cum, aut vel alias distinctio! Inventore temporibus minima quisquam nisi, magnam eaque assumenda deleniti tempora velit rem esse optio expedita omnis aut commodi totam, tenetur unde. Consectetur earum consequatur expedita! Corporis ipsum hic repellendus omnis dolores cupiditate, saepe aliquam ea repellat, dolor unde nam dolorem vel mollitia! Necessitatibus placeat pariatur quasi voluptas blanditiis vel, quas qui minima ut. Velit, beatae quo quisquam illo obcaecati sunt earum sint placeat atque itaque explicabo. Inventore vel iusto doloremque, soluta, pariatur laudantium exercitationem, repudiandae eligendi suscipit recusandae id omnis minima at distinctio debitis iure! Voluptate exercitationem unde enim incidunt nobis maxime vero iusto numquam libero necessitatibus veritatis maiores saepe odio laborum, laudantium reprehenderit magni sit possimus. Sint doloremque quis aspernatur laborum odio corrupti recusandae placeat rem eos? Quisquam, eum. Mollitia soluta modi delectus est explicabo dignissimos repellendus labore iure officia sint! Ratione porro provident exercitationem tempora quam, qui corrupti earum error eos id, assumenda animi iure incidunt adipisci modi perferendis ab laudantium hic. Obcaecati nobis in delectus assumenda aspernatur iusto necessitatibus a, ab iure, maiores laudantium. Possimus sed nostrum, doloribus culpa exercitationem officiis! Culpa deleniti sunt voluptates, alias modi nobis nostrum cum! Enim, delectus tenetur dolorem repellat eaque molestias fugiat, cumque, voluptatum dicta temporibus officiis? Optio nam quidem voluptate corrupti aspernatur similique eveniet facere neque quas perspiciatis hic dolorem saepe nemo ea unde nobis non qui libero illo totam, blanditiis deleniti in reiciendis! Ex expedita officia odio velit labore alias, ipsum repudiandae illum nesciunt dolor, ipsam unde blanditiis. Aut eveniet nulla magnam eius eligendi quaerat earum aspernatur animi fuga officia placeat iste nisi labore, consectetur consequatur sapiente aliquam. Unde, aliquid. Aut, dolor, possimus hic harum numquam repellendus veniam porro rerum voluptatum veritatis ex animi saepe accusantium eaque eligendi. Doloremque minus reiciendis maxime quisquam. Totam, consequuntur! Magni earum labore exercitationem itaque, ratione enim et est fuga! Beatae doloremque quos suscipit et similique! Odit odio consectetur animi eos sit itaque ipsa praesentium accusamus qui dolorum ab laboriosam eligendi, commodi quaerat quasi sint nemo repellendus rerum magnam, neque earum veniam! Dolorem deserunt quis asperiores quibusdam aspernatur fuga. Fugit, ipsam. Quisquam repellat mollitia odit placeat adipisci. Fugit a illum vel unde saepe delectus dolorum rerum facilis, accusamus facere culpa optio in minus quo aperiam iste dolor sequi alias libero! Neque praesentium quod quos illum temporibus earum soluta molestias minima eos, magnam obcaecati porro ea expedita nostrum deserunt dignissimos pariatur eum facere! Aut dolore qui facilis dolor numquam cupiditate dolorem commodi earum blanditiis minus repudiandae veritatis laborum, laudantium nihil consectetur eveniet delectus sint nesciunt perspiciatis, enim voluptatem veniam? Sunt tenetur debitis dolorum! Minus obcaecati velit et, incidunt enim vel animi sint possimus soluta dignissimos?'
  });
};

const aboutController = (req, res) => {
  res.render('about', {
    creators: [
      {
        name: 'Dennison: ',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint doloremque nesciunt est eos quibusdam ut hic, vitae sit asperiores deserunt mollitia. Error mollitia quae magni sed vero? Voluptatem, laboriosam harum!'
      },
      {
        name: 'Corbett: ',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint doloremque nesciunt est eos quibusdam ut hic, vitae sit asperiores deserunt mollitia. Error mollitia quae magni sed vero? Voluptatem, laboriosam harum!'
      },
      {
        name: 'Morris: ',
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint doloremque nesciunt est eos quibusdam ut hic, vitae sit asperiores deserunt mollitia. Error mollitia quae magni sed vero? Voluptatem, laboriosam harum!'
      }
    ]
  });
};

const shippingController = (req, res) => {
  let sql = 'SELECT * FROM state';
  db.all(sql, [], (err, states) => {
    if (err) throw err;
    const data = {
      states
    };
    res.render('shipping', data);
  });
};

const storeController = (req, res) => {
  let sql = 'SELECT * FROM Products';
  db.all(sql, [], (err, products) => {
    if (err) throw err;
    const reducer = (accumulator, currentItem) => accumulator + currentItem.price * currentItem.quantity;
    const total = req.session.items.reduce(reducer, 0);
    console.log('Price: ' + total);
    // expected output: 10
    const data = {
      products,
      items: req.session.items,
      total
    };
    res.render('store', data);
  });
};

const accountController = (req, res) => {
  let sql = `SELECT * FROM OrderItems INNER JOIN Products ON OrderItems.productId = Products.productId INNER JOIN Orders ON OrderItems.orderNumber = Orders.OrderNumber WHERE Orders.userId = ${req.session.userId};`;
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
    console.log(data);
    res.render('account', data);
  });
};

const cartController = (req, res) => {
  const reducer = (accumulator, currentItem) => accumulator + currentItem.price * currentItem.quantity;
  const subtotal = req.session.items.reduce(reducer, 0);
  const shipping = (subtotal * 0.03).toFixed(2);
  const tax = (subtotal * 0.08).toFixed(2);
  const total = (subtotal + +shipping + +tax).toFixed(2);

  let sql = `SELECT * FROM PaymentInformation WHERE userId = ${req.session.userId}`;
  db.all(sql, [], (err, paymentInformation) => {
    const trimmedCards = paymentInformation.map(i => {
      const updateItem = {
        ...i,
        cardNumber: String(i.cardNumber).slice(12,17)
      };
     return updateItem;
    });

    sql = `SELECT * FROM ShippingInformation WHERE userId = ${req.session.userId}`;
    db.all(sql, [], (shipmentError, shipmentInformation) => {
      const data = {
        items: req.session.items,
        subtotal,
        shipping,
        tax,
        total,
        err,
        paymentInformation: trimmedCards,
        shipmentInformation
      };
      res.render('cart', data);
    });
  });
};

const processAddToCart = (req, res) => {
  console.log("POST: " + req.body.item);
  let sql = 'SELECT * FROM Products';
  db.all(sql, [], (err, products) => {
    if (err) throw err;
    const selectedItem = products.find( i => String(i.productId) === req.body.item);
    const item = {
      description: selectedItem.description,
      price: selectedItem.unitPrice,
      quantity: req.body.quantity,
      productId: selectedItem.productId
    }
    req.session.items.push(item);
    req.session.save();
    res.redirect('/store');
  });
};

const deleteItem = (req, res) => {
  const i = req.params.index;
  req.session.items.splice(i, 1);
  req.session.save();
  res.redirect('/store');
};

const payment = (req, res) => {
  res.render('payment');
};

const processNewShippingInformation = (req, res) => {
  console.log('Userid: ' + req.session.userId);
  db.run(`INSERT INTO ShippingInformation (userId, address1, address2, city, state, zip)
    VALUES (
      ${req.session.userId},
      '${req.body.address1}',
      '${req.body.address2}',
      '${req.body.city}',
      '${req.body.state}',
      ${req.body.zipCode}
    );`);
    res.redirect('/cart');
};

const paymentMethod = (req, res) => {
  res.render('paymentMethod');
};

const addPaymentMethod = (req, res) => {
  db.run(`INSERT INTO PaymentInformation (userId, cardType, cardNumber, expDate) VALUES (
    ${req.session.userId},
    '${req.body.cardType}',
    '${req.body.cardNumber}',
    '${req.body.expDate}'
  );`)
  res.redirect('/cart');
};

const processOrder = (req, res) => {
  let sql = `SELECT * FROM PaymentInformation WHERE paymentId = ${req.body.paymentId}`;
  db.all(sql, [], (err, paymentInformation) => {
    sql = `SELECT * FROM ShippingInformation WHERE shippingId = ${req.body.shippingId}`;
    db.all(sql, [], (err, shippingInformation) => {
      sql = `INSERT INTO Orders (userId, address1, address2, city, state, zip, expDate, cardNumber, cardType, subtotal, tax, total, shipping) VALUES (
        ${req.session.userId},
        '${shippingInformation[0].address1}',
        '${shippingInformation[0].address2}',
        '${shippingInformation[0].city}',
        '${shippingInformation[0].state}',
        '${shippingInformation[0].zip}',
        '${paymentInformation[0].expDate}',
        '${paymentInformation[0].cardNumber}',
        '${paymentInformation[0].cardType}',
        ${req.body.subtotal},
        ${req.body.tax},
        ${req.body.total},
        ${req.body.shipping}
      )`;
      db.all(sql, [], (err, newOrder) => {
        sql = `SELECT * FROM Orders WHERE userId = ${req.session.userId} ORDER BY orderNumber DESC LIMIT 1` ;
        db.all(sql, [], (err, orderInformation) => {
          req.session.items.forEach(item => {
            const itemTotal = +item.quantity * +item.price;
            let statement = `INSERT INTO OrderItems (userId, orderNumber, productId, quantity, totalPrice) VALUES (
              ${req.session.userId},
              ${orderInformation[0].orderNumber},
              ${item.productId},
              ${item.quantity},
              ${itemTotal}
            )`;
            db.run(statement);
          });
          req.session.items = [];
          res.redirect('/account');
        })
      });
    });
  });
};

module.exports = {
  homepageController,
  aboutController,
  shippingController,
  storeController,
  accountController,
  cartController,
  processAddToCart,
  deleteItem,
  payment,
  processNewShippingInformation,
  paymentMethod,
  addPaymentMethod,
  processOrder,
};

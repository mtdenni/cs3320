const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('cs3320.db', err => {
  if (err) {
    return console.err(err.message);
  }
  console.log('Connected to the database!');
  console.log('Connected server at http://localhost:3000');
});

const homepageController = (req, res) => {
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

const loginController = (req, res) => {
  res.render('login', {});
};

const logoutController = (req, res) => {
  res.redirect('/');
};

const registerController = (req, res) => {
  res.render('register', {});
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
    const data = {
      products
    };
    res.render('store', data);
  });
};

const accountController = (req, res) => {
  let sql = 'SELECT * FROM state';
  db.all(sql, [], (err, states) => {
    if (err) throw err;
    const data = {
      states
    };
    res.render('account', data);
  });
};

const cartController = (req, res) => {
  res.render('cart', {});
};

module.exports = {
  homepageController,
  aboutController,
  loginController,
  logoutController,
  registerController,
  shippingController,
  storeController,
  accountController,
  cartController
};

const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('cs3320.db', err => {
  if (err) {
    return console.err(err.message);
  }
  console.log('Connected to the database!');
});

exports.db = db;
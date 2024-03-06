const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'lyw520..',
  database: 'exapp'
});


db.connect((err) => {
  if (err) throw err;
  console.log('Connected!,连接成功');
});

module.exports = db;

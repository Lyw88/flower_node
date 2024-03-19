const { json } = require("body-parser");
const db = require("../../db/connect");

// 商品详情 | id搜索
exports.product_item = (req, res) => {
  const sql = `SELECT * FROM product WHERE p_id = ${req.query.p_id}`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: err.sqlMessage,
      });
    } else {
      result[0].p_image = JSON.parse(result[0].p_image);
      result[0].p_price = result[0].p_price.toFixed(2)
      res.send(result[0]);
    }
  });
};

//搜索商品
exports.product_search = (req, res) => {
  let sql = `SELECT * FROM product WHERE p_name LIKE '%${req.query.p_name}%'`;
  if(req.query.sort){
    sql = sql + `ORDER BY ${req.query.sort} ${req.query.method}`
  }
  db.query(sql, (err, results) => {
    if (err) {
      //数据库语句执行失败
      res.status(500).json({
        message: err.sqlMessage,
      });
    } else if (results.length > 0) {
      results[0].p_image = JSON.parse(results[0].p_image)
      res.send(results)
    } else {
      res.send({}); // 如果没有数据，返回空对象
    }
  });
};

// 根据标签搜索
exports.tag_search = (req, res) => {
  let sql = `SELECT * FROM product WHERE p_tag LIKE '%${req.query.p_name}%'`;
  if(req.query.sort){
    sql = sql + `ORDER BY ${req.query.sort} ${req.query.method}`
  }
  db.query(sql, (err, results) => {
    if (err) {
      //数据库语句执行失败
      res.status(500).json({
        message: err.sqlMessage,
      });
    } else if (results.length > 0) {
      res.send(results)
    } else {
      res.send({}); // 如果没有数据，返回空对象
    }
  });
};

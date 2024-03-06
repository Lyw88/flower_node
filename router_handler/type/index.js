const db = require("../../db/connect");

exports.sort = (req, res) => {
  const sql = `SELECT * FROM sort`;
  db.query(sql, (err, rows) => {
    if (err) {
      //数据库语句执行失败
      res.status(500).json({
        message: err.sqlMessage,
      });
    } else if (rows.length > 0) {
      res.send(rows); // 只返回第一行数据作为对象
    } else {
      res.send({}); // 如果没有数据，返回空对象
    }
  });
};

// 渲染分类页
exports.type = (req, res) => {
  const s_id = req.query.s_id;
  const sql = `SELECT * FROM type WHERE s_id = ${s_id}`;
  db.query(sql, (err, rows) => {
    if (err) {
      //数据库语句执行失败
      res.status(500).json({
        message: err.sqlMessage,
      });
    } else if (rows.length > 0) {
      console.log("成功进入第二阶段");
      let count = 0;
      for (let i = 0; i < rows.length; i++) {
        const sql = `SELECT * FROM type_detail WHERE t_id = ${rows[i].t_id}`;
        db.query(sql, (err, results) => {
          if (err) {
            //数据库语句执行失败
            res.status(500).json({
              message: err.sqlMessage,
            });
          } else if (results.length > 0) {
            rows[i].product = results;
          }
          count++;
          if (count === rows.length) {
            res.send(rows);
          }
        });
      }
    } else {
      res.send({}); // 如果没有数据，返回空对象
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

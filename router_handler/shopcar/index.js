const db = require("../../db/connect");

//加入购物车
exports.add_shopcar = (req, res) => {
    const sql = `SELECT * FROM shopcar WHERE u_id = ${req.query.u_id} AND p_id = ${req.query.p_id}`;
    db.query(sql, (err, row) => {
      if (err) {
        console.log(err);
        res.status(499).json({
          message: err.sqlMessage,
        });
      } else if (row.length > 0) {
        res.send({ message: "商品已存在购物车" });
      } else {
        const sql = `INSERT INTO shopcar SET u_id = ${req.query.u_id},p_id = ${req.query.p_id},quantity = ${req.query.quantity}`;
        db.query(sql, (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).json({
              message: err.sqlMessage,
            });
          } else {
            res.send({
              message: "加入购物车成功",
            });
          }
        });
      }
    });
  };


  //渲染购物车
  exports.load_shopcar = (req,res)=>{
    const sql = `SELECT * FROM shopcar WHERE u_id = ${req.query.u_id}`
    db.query(sql,(err,result)=>{
      if (err) {
        console.log(err);
        res.status(500).json({
          message: err.sqlMessage,
        });
      }else if (result.length > 0){
        res.send(result)
      }else{
        res.send({message:'当前购物车为空'})
      }
    })
  }
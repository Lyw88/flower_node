const { json } = require("body-parser");
const db = require("../../db/connect");

exports.product_item = (req,res)=>{
    const sql = `SELECT * FROM product WHERE p_id = ${req.query.p_id}`
    db.query(sql,(err, result)=>{
      if (err) {
        console.log(err);
        res.status(500).json({
          message:err.sqlMessage
        })
      }else{
        result[0].p_image = JSON.parse(result[0].p_image)
        console.log(result[0]);
        res.send(result[0])
      }
    })
};
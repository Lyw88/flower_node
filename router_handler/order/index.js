const db = require("../../db/connect");


exports.default_address = (req,res)=>{
    const sql = `SELECT * FROM address WHERE u_id = ${req.query.u_id} AND isDefault = 1`
    db.query(sql,(err,result)=>{
        if (err) {
            console.log(err);
            res.status(499).json({
              message: err.sqlMessage,
            });
          }else{
            res.send(result)
          }
    })
}
const db = require('../../db/connect')
const fs = require('fs');
const path = require('path');

// exports.user_edit = (req,res)=>{
//   const userId = req.body.u_id;
//   const base64Data = req.body.base64;
//   const bufferData = Buffer.from(base64Data, 'base64');
//   const sql = `UPDATE user_detail SET u_avatar = ? WHERE u_id = ?`;
//   db.query(sql,[bufferData, userId],(err, result,fields) => {
//     if(err){  //数据库语句执行失败
//       res.status(500).json({
//           message:err.sqlMessage
//       })
//   } else {
//         res.send('图片成功上传');
//     }
// });
// }

exports.user_edit = (req,res)=>{
  const updateData = {...req.body}
  delete updateData.u_id
  let sql = `UPDATE user_detail SET`
  let value = []
  for(const key in updateData){
    if(updateData[key]){
      sql += ` ${key} = ?,`
      if(key === 'u_avatar'){
        updateData[key] = Buffer.from(updateData[key], 'base64');
      }
      value.push(updateData[key])
    }
  }

  // 去掉最后一个逗号
  sql = sql.slice(0, -1);

  // 添加条件语句
  sql += ` WHERE u_id = ${req.body.u_id}`
  db.query(sql,value,(err,result)=>{
      if(err){  //数据库语句执行失败
        res.status(500).json({
          message:err.sqlMessage
        })
      }else{
        res.send('资料修改成功')
      }
  })
}

exports.load_user = (req,res)=>{
  const id = req.query.u_id;
  db.query(`SELECT * FROM user_detail WHERE u_id = ${id}`, (err, result,fields)=>{
    if (err) {
      console.log(err);
      res.status(500).send('Error retrieving avatar');
    }else{
      if(result[0].u_avatar!=null){
        result[0].u_avatar = result[0].u_avatar.toString("base64")
      }
      res.send({
        data:result[0]
      });
    }
  })
}


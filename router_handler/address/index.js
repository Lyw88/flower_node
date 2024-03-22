const { log } = require('console');
const db = require('../../db/connect')
const querystring = require('querystring');

//渲染
exports.address=(req,res)=>{
  const sql ='SELECT * FROM address where u_id = ?'
  const values = [req.query.u_id];
  db.query(sql,values, (err, result) => {
    if(err){  //数据库语句执行失败
      res.status(500).json({
          message:err.sqlMessage
      })
  }else if(result.length < 1){ //返回的值为空数组
      res.status(200).json({
          code:500,
          message:'还没有设置地址'
      })
  }else{
      res.status(200).json({
          message:'验证通过',
          data:result,
      })
  }
  });
}


//编辑地址
exports.editaddress = (req,res)=>{
  const sql = 'UPDATE address SET name = ?,tel = ?,addressDetail = ?,isDefault = ?,province = ?,city = ?,county = ? WHERE id = ?'
  const {id,name,tel,addressDetail,isDefault,province,city,county} = req.body
  db.query(sql,[name,tel,addressDetail,isDefault,province,city,county,id],(err,result)=>{
    if(err){  //数据库语句执行失败
      res.status(500).json({
          message:err.sqlMessage
      })
  }else{
    res.status(200).json({
      message:'地址更新成功',
    })
  }
  }
  )
}

//新增地址
exports.addaddress = (req,res)=>{
  sql='INSERT INTO address SET name = ?,tel = ?,addressDetail = ?,isDefault = ?,province = ?,city = ?,county = ?,u_id = ?'
  const {name,tel,addressDetail,isDefault,province,city,county,u_id} = req.body
  db.query(sql,[name,tel,addressDetail,isDefault,province,city,county,u_id],(err,result)=>{
    if(err){  //数据库语句执行失败
      res.status(500).json({
          message:err.sqlMessage
      })
    }else{
      res.status(200).json({
        message:'地址新增成功',
      })
    }
  })
}

//删除地址 
exports.deladdress = (req,res)=>{
  sql = `delete from address where id = ${req.query.id}`
  db.query(sql,(err,result)=>{
    if(err){  //数据库语句执行失败
      res.status(500).json({
          message:err.sqlMessage
      })
    }else{
      res.status(200).json({
        message:'地址删除成功',
      })
    }
  })
}

//设置默认
exports.toggledefault = (req,res)=>{
  const id = req.query.id
  sql = 'update address set isDefault = 0 where id = ?'
  db.query(sql,id,(err,result)=>{
    if(err){  //数据库语句执行失败
      res.status(500).json({
          message:err.sqlMessage
      })
    }else{
      res.status(200).json({
        message:'默认地址设置成功',
      })
    }
  })
}

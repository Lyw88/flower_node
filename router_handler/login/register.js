const db = require('../../db/connect')

exports.register = (req,res)=>{
    sql='INSERT INTO user SET u_name = ?,u_phone = ?,u_pwd = ?'
    const {u_phone,u_pwd}=req.body
    db.query('SELECT * FROM user where u_phone = ?',u_phone,(err,result)=>{
        if(err){  //数据库语句执行失败
            res.status(500).json({
                message:err.sqlMessage
            })
        }else if(result.length > 0){
            res.status(200).json({
                code:500,
                message:'手机号已注册'
            })
        }else{
            db.query(sql,[u_phone,u_pwd],(err,result)=>{
                if(err){  //数据库语句执行失败
                    res.status(500).json({
                        message:err.sqlMessage
                    })
                }else{
                    res.status(200).json({
                        code:10000,
                        message:'用户注册成功',
                    })
                }
            })
        }
    })
    
    
}
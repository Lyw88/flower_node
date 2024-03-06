const db = require('../../db/connect')
const jwt = require('../../utils/jwt')


exports.userlogin = (req,res)=>{
    const sql = 'SELECT * FROM user WHERE u_phone = ? AND u_pwd = ?';
    const values = [req.body.u_phone, req.body.u_pwd];
    const userInfo = req.body;
    
    db.query(sql,values,(err,result,fields)=>{
        console.log(result[0].u_avatar);
      if(err){  //数据库语句执行失败
        res.status(500).json({
            message:err.sqlMessage
        })
    }else if(result.length < 1){ //返回的值为空数组
        res.status(422).json({
            message:'用户名或密码错误'
        })
    }else{
        let token = jwt.create({'id': req.body.u_phone}, 60*60*2);
        result[0].token =token
        res.status(200).json({
            message:'验证通过',
            data:result[0],
        })
    }
    })
}

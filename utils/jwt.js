// jwt.js
const jwt = require('jsonwebtoken');
const config = {
    secret: 'cat', // 密钥
    time: 60*60, // 过期时间
}

// 创建签名令牌
function create (data, time) {
    let token = jwt.sign(data, config.secret, {
        algorithm: 'HS256',
        expiresIn: time || config.time,
    });
    return token;
}

// 验证令牌
function verify (token) {
    return jwt.verify(token, config.secret, function (err, decoded) {
      if (err) {
        return {
          code: 1,
          msg: 'invalid',
          data: null,
        }
      } else {
        return {
          code: 2,
          msg: 'valid',
          data: decoded,
        }
      }
    })
}

// 解码令牌
function decoded (token, complete = true) {
    return jwt.decode(token, {
      complete,
    });
}

const token = {
    create,
    verify,
    decoded,
}

module.exports = token;

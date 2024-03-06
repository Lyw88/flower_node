const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { expressjwt: jwt } = require("express-jwt");

const port = 3000;
const app = express();

const indexrouter = require('./router/index')

// 处理post请求参数
const bodyParser=require("body-parser")
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// 跨域
app.use(cors());



let objMulter = multer({ dest: "./public/upload" });
app.use(objMulter.any())//any表示任意类型的文件
// app.use(objMulter.image())//仅允许上传图片类型

app.use(express.static("./public"));//将静态资源托管，这样才能在浏览器上直接访问预览图片或则html页面

// 设置密钥
const SECRET_KEY = "cat";



// //解析token，验证token
// app.use(
//   jwt({
//     secret: SECRET_KEY, // 签名的密钥 或 PublicKey
//     algorithms: ["HS256"],
//   }).unless({
//     path: ['/api/login','/api/address'], // 指定路径不经过 Token 解析 页面白名单
//   })
// );

// // 验证token失败
// app.use(function (err, req, res, next) {
//   if (err.name === "UnauthorizedError") {
//     res.status(401).send("干嘛呢？你想硬闯？！");
//   }
// });


app.use('/api',indexrouter)

app.listen(port, (err) => {
  console.log(`Example app listening at http://localhost:${port}`);
  if (err) {
    console.log("连接失败");
  }
});

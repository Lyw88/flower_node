const express = require('express');
const router = express.Router();

const login = require('../router_handler/login/login')
const address = require('../router_handler/address')
const type = require('../router_handler/type');
const register= require('../router_handler/login/register');
const user =require('../router_handler/login/user')
const product = require('../router_handler/product')
const shopcar = require('../router_handler/shopcar')
const order = require('../router_handler/order')


// ------------------------------------------------登录--------------------------------------------------
router.post('/login',login.userlogin)
//用户注册
router.post('/register',register.register)

// ------------------------------------------------用户--------------------------------------------------
//用户编辑
router.post('/useredit',user.user_edit)
// 获取用户信息
router.get('/user',user.load_user)


// ------------------------------------------------商品--------------------------------------------------
//获取分类
router.get('/type',type.sort)

//获取详细分类 带图or不带
router.get('/type_detail',type.type)

//搜索商品
router.get('/product_search',product.product_search)

//标签搜索
router.get('/tag_search',product.tag_search)

//商品详情 | id搜索
router.get('/product_item',product.product_item)

// ------------------------------------------------地址--------------------------------------------------
//获取用户 收货地址
router.get('/address',address.address)

//更新收货地址 
router.post('/address/edit',address.editaddress)

//新增收货地址
router.post('/address/add',address.addaddress)

//删除地址
router.get('/address/del',address.deladdress)

//默认地址
router.get('/address/default',address.toggledefault)

module.exports = router;

// ------------------------------------------------购物车--------------------------------------------------

// 加入购物车
router.get('/add_shopcar',shopcar.add_shopcar)

//渲染购物车
router.get('/load_shopcar',shopcar.load_shopcar)

//删除购物车商品
router.get('/delproduct',shopcar.delproduct)


// ------------------------------------------------订单--------------------------------------------------
// 提交订单
router.get('/submit_order',order.submit_order)
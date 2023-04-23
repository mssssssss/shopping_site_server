const express = require("express");
var db = require("../db");
// 创建路由对象
const router = express.Router();

// 验证登录信息
router.get("/checkLogin", (req, res) => {
  console.log("req", req.query);
  const username = req.query.username; //获取请求过来的username
  const password = req.query.password; //获取请求过来的pwd
  const role = parseInt(req.query.role); //获取请求过来的role
  // 数据库中是否有对应的用户名
  let sql_1 = `select * from user_info where user_name= '${username}' `;
  // 数据库中是否有这样的用户名-密码-角色组合
  let sql_2 = `select * from user_info where user_name= '${username}' and password= '${password}' and user_role=${role} `;
  // console.log("触发checkLogin方法");
  db.query(sql_1, (err, result) => {
    if (err) throw err;
    // 如果不能找到这样的用户名
    if (result.length === 0) {
      res.send({
        code: 400,
        message: "用户名不存在",
      });
    } else {
      db.query(sql_2, (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
          res.send({
            code: 400,
            message: "请检查您的密码/角色",
          });
        } else {
          res.send({
            code: 200,
            message: "登录成功",
            result: result,
          });
        }
      });
    }
  });
});

// 检查用户名是否重复了
router.get("/findUser", (req, res) => {
  console.log("执行了---");
  const username = req.query.username;
  console.log(username);
  let sql = `select * from user_info where user_name= '${username}' `;
  db.query(sql, (err, result) => {
    if (err) throw err;
    // 用户名存在的情况
    if (result.length !== 0) {
      res.send({
        code: 400,
        message: "用户名已存在",
      });
    } else {
      res.send({
        code: 200,
        message: "用户名可以注册",
      });
    }
  });
});

// 获取当前用户（通过用户名）
router.get("/getCurrentUser", (req, res) => {
  console.log(req.query.username);
  let sql = `select * from user_info where user_name = '${req.query.username}' `;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send({
      code: 200,
      message: "ok",
      result: result,
    });
  });
});

// 获取所有用户信息
router.get("/getAllUser", (req, res) => {
  console.log(req);
  console.log(req.query);
  let sql = "select * from user_info";
  console.log(sql);
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send({
      code: 200,
      message: "ok",
      result: result,
    });
  });
});

// 通过用户名 模糊查询
router.get("/getSatisUser", (req, res) => {
  let sql = `select * from user_info where user_name like '%${req.query.username}%' `;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send({
      code: 200,
      message: "ok",
      result: result,
    });
  });
});

// 添加用户信息
router.get("/addUser", (req, res) => {
  const obj = req.query;
  let role = req.query.role === "普通用户" ? 0 : 1;
  let sql = `insert into user_info(user_name,password,user_role,tel,email,user_balance) values ('${obj.username}','${obj.password}','${role}','${obj.phone}','${obj.email}',0 )`;
  db.query(sql, (result) => {
    // if (err) throw err;
    // console.log(result);
    console.log("res", result);
    res.send({
      code: 200,
      message: "用户添加成功",
    });
    // 用户名存在的情况
  });
});

// 通过username 删除某个用户
router.get("/deleteUser", (req, res) => {
  console.log(req.query);
  let sql = `delete from user_info where user_id= ${req.query.id} `;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send({
      code: 200,
      message: "ok",
    });
  });
});

// 通过用户名 更新某个用户
router.get("/updateUser", (req, res) => {
  console.log(req.query.role);
  let role = req.query.role === "普通用户" ? 0 : 1;
  let sql = `update user_info set password='${req.query.password}',user_role=${role}, tel='${req.query.phone}',email='${req.query.email}' where user_name= '${req.query.username}' `;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send({
      code: 200,
      message: "ok",
    });
  });
});

// 通过用户名 更新某个用户（不更新角色信息）
router.get("/updateUser2", (req, res) => {
  console.log(req.query);
  let sql = `update user_info set password='${req.query.password}', tel='${req.query.tel}',email='${req.query.email}' where user_name= '${req.query.user_name}' `;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send({
      code: 200,
      message: "ok",
    });
  });
});

// 将路由对象共享出去
module.exports = router;

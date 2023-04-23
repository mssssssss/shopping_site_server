const express = require("express");
var db = require("../db");
// 创建路由对象
const router = express.Router();

// 获取所有订单信息(按创建时间倒序)
router.get("/getAllOrder", (req, res) => {
  let sql = "select * from order_info order by create_time desc";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send({
      code: 200,
      message: "ok",
      result: result,
    });
  });
});

// 通过id来删除订单
router.get("/deleteOrder", (req, res) => {
  let sql = `delete from order_info where order_id= ${req.query.id} `;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send({
      code: 200,
      message: "ok",
    });
  });
});

// 通过id来更新订单（的开始日期、结束日期、房间数量、预订人姓名、预订人电话、订单状态）
router.get("/updateOrder", (req, res) => {
  // 获取订单状态
  let sql = `update order_info set start_date= '${req.query.start_date}',end_date= '${req.query.end_date}', room_num=${req.query.room_num}, guest_name='${req.query.guest_name}', guest_tel='${req.query.guest_tel}', order_state=${req.query.order_state}  where order_id= ${req.query.order_id} `;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send({
      code: 200,
      message: "ok",
    });
  });
});

// 通过预订人姓名来 模糊查询订单
router.get("/getSatisOrder", (req, res) => {
  let sql = `select * from order_info where guest_name like '%${req.query.guest_name}%' order by create_time desc`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send({
      code: 200,
      message: "ok",
      result: result,
    });
  });
});

// 得到某个用户的所有订单 并按订单创建时间降序
router.get("/getMyAllOrder", (req, res) => {
  let sql = `select * from order_info join user_info on order_info.user_id=user_info.user_id join hotel_info on order_info.hotel_id=hotel_info.hotel_id where user_info.user_name='${req.query.username}' order by order_info.create_time desc`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send({
      code: 200,
      message: "ok",
      result: result,
    });
  });
});

// 得到某个用户的未付款订单
router.get("/getMyUnPayOrder", (req, res) => {
  let sql = `select * from order_info join user_info on order_info.user_id=user_info.user_id join hotel_info on order_info.hotel_id=hotel_info.hotel_id where user_info.user_name='${req.query.username}' and order_state=0 order by order_info.create_time desc`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send({
      code: 200,
      message: "ok",
      result: result,
    });
  });
});

// 得到某个用户的已完成订单
router.get("/getMyFinishOrder", (req, res) => {
  let sql = `select * from order_info join user_info on order_info.user_id=user_info.user_id join hotel_info on order_info.hotel_id=hotel_info.hotel_id where user_info.user_name='${req.query.username}' and order_state=1 order by order_info.create_time desc`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send({
      code: 200,
      message: "ok",
      result: result,
    });
  });
});

// 得到某个用户的已取消订单
router.get("/getMyCancelOrder", (req, res) => {
  let sql = `select * from order_info join user_info on order_info.user_id=user_info.user_id join hotel_info on order_info.hotel_id=hotel_info.hotel_id where user_info.user_name='${req.query.username}' and order_state=2 order by order_info.create_time desc`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send({
      code: 200,
      message: "ok",
      result: result,
    });
  });
});

// 取消某个订单
// 修改订单状态为2 同时加库存
router.get("/cancelOrder", (req, res) => {
  let sql = `update order_info set order_state=2 where order_id='${req.query.order_id}' `;
  let sql2 = `select * from order_info where order_id='${req.query.order_id}' `;
  db.query(sql, (err, result) => {
    if (err) throw err;
    db.query(sql2, (err1, result1) => {
      console.log(result1);
      let sql4 = `select * from inventory_info where hotel_id= ${result1[0].hotel_id} and date= '${result1[0].start_date}' `;
      // let sql4 = `select * from inventory_info where hotel_id= 2 and date= "2023-04-27" `;
      db.query(sql4, (err2, result2) => {
        console.log(
          result1[0].room_num +
            " " +
            result2[0].hotel_id +
            " " +
            result2[0].date
        );
        let sql3 = `update inventory_info set amount=amount+  ${result1[0].room_num} where hotel_id= ${result2[0].hotel_id} and date= '${result2[0].date}' `;
        console.log("库存：", result2);
        db.query(sql3, (err3, res3) => {
          console.log(res3);
          res.send({
            code: 200,
            message: "ok",
          });
        });
      });
      // db.query(sql3, (err2, result2) => {
      //   console.log("===" + result2);
      //   res.send({
      //     code: 200,
      //     message: "ok",
      //   });
      // });
    });
  });
  // 取消某个订单的库存
});

// 支付某个订单
router.get("/payOrder", (req, res) => {
  let sql = `update order_info join user_info on order_info.user_id=user_info.user_id set order_info.order_state=1, user_balance= ${req.query.amount} where order_id='${req.query.order_id}' `;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send({
      code: 200,
      message: "ok",
    });
  });
});

// 给某个用户充值
router.get("/addAmount", (req, res) => {
  let sql = `update user_info set user_balance=user_balance+${req.query.add} where user_name='${req.query.username}' `;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send({
      code: 200,
      message: "ok",
    });
  });
});

module.exports = router;

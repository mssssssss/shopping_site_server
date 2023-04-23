// 加载MySQL模块
var mysql = require("mysql");
// 创建MySQL连接池
var db = mysql.createPool({
  connectionLimit: 10,
  host: "127.0.0.1", //服务器地址
  post: 3306, //数据库端口
  user: "root", //数据库登陆就名
  password: "123456", //数据库登陆密码
  database: "shopping_site", //数据库名
  timezone: "08:00", //更新时区 防止读出的date比真实的date慢8小时
});

// 测试mysql连接
db.query("select 1", (err, results) => {
  // 如果mysql 模块工作期间报错了
  if (err) return console.log(err.message);
  // 能够成功的执行 SQL 语句
  console.log(results); //结果为：[ RowDataPacket { '1': 1 } ]证明连接成功
});

module.exports = db;

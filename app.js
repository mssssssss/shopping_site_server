// 创建并启动服务器
var express = require("express");
var app = express();
let port = 5000;
app.listen(port, function () {
  console.log("服务器启动成功，请在http://localhost:" + port + "中访问....");
});

// var cors = require("cors");
// app.use(cors({ origin: true, credentials: true }));
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// 导入并注册用户路由模块
const userRouter = require("./router/user");
// 导入并注册用户路由模块
const orderRouter = require("./router/order");
app.use("/api", userRouter);
app.use("/api", orderRouter);

////
const userRoutes = require("./routes/user.js");
const hotelRoutes = require("./routes/hotel.js");
const orderRoutes = require("./routes/order.js");
const inventoryRoutes = require("./routes/inventory.js");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use("/api/user", userRoutes);
app.use("/api/hotel", hotelRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/inventory", inventoryRoutes);

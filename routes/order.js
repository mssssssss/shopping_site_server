var express = require("express");
var {
  addOrder,
  getOrderDetail,
  setOrder,
  getMyOrder,
  getPay,
} = require("../controllers/order.js");

const router = express.Router();

router.post("/", addOrder);
router.get("/:id", getOrderDetail);
router.put("/:id", setOrder);
router.get("/myorder/:id", getMyOrder);
router.post("/myorder", getPay);

module.exports=router;

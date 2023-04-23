var express = require("express");
var { login, logout, setMoney, getMoney } = require("../controllers/user.js");

const router = express.Router();

// router.get("/test", addUser)

router.post("/login", login);
router.post("/logout", logout);
router.put("/:id", setMoney);
router.get("/:id", getMoney);

module.exports=router;

var {
  getInventory,
  setInventory,
  addInventory,
} = require("../controllers/inventory.js");
var express = require("express");
const router = express.Router();

router.post("/", getInventory);
router.put("/", setInventory);
router.put("/add", addInventory);

module.exports = router;

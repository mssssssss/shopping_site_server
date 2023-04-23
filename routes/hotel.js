var {
  getHotels,
  getSearch,
  getHotelDetail,
} = require("../controllers/hotel.js");
var express = require("express");
const router = express.Router();

router.get("/list", getHotels);
router.post("/search", getSearch);
router.get("/:id", getHotelDetail);

module.exports=router;

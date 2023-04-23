var db = require("../db.js");

const getHotels = (req, res) => {
  let q;
  if (req.query.sortWay === "price") {
    q = "SELECT * FROM hotel_info order by new_price";
  } else if (req.query.sortWay === "star") {
    q = "SELECT * FROM hotel_info order by star_score DESC";
  } else {
    q = "SELECT * FROM hotel_info order by hotel_id";
  }

  db.query(q, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data);
  });
};

const getSearch = (req, res) => {
  const q = `SELECT * FROM hotel_info WHERE hotel_name LIKE "%${req.body.hotelName}%"`;
  db.query(q, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data);
  });
};

const getHotelDetail = (req, res) => {
  const q = "SELECT * FROM hotel_info WHERE hotel_id=?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[0]);
  });
};

module.exports = { getHotels, getSearch, getHotelDetail };

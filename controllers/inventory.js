var db = require("../db.js");

const getInventory = (req, res) => {
  const q = `SELECT * FROM inventory_info WHERE hotel_id='${req.body.hotelId}' AND date='${req.body.dateString}'`;
  db.query(q, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data);
  });
};

const setInventory = (req, res) => {
  const q = "UPDATE inventory_info SET amount=? WHERE inventory_id=?";
  db.query(q, [req.body.amount, req.body.inventory_id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[0]);
  });
};

const addInventory = (req, res) => {
  const q =
    "UPDATE inventory_info SET amount=amount+? WHERE hotel_id=? AND date=?";

  console.log(req.body);
  db.query(q, [req.body.num, req.body.hotel_id, req.body.date], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[0]);
  });
};

module.exports = { getInventory, setInventory, addInventory };

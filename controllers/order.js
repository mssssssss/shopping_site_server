var db = require("../db.js");
const addOrder = (req, res) => {
  console.log(req.body);
  const q =
    "INSERT INTO order_info(`user_id`, `hotel_id`, `start_date`,`end_date`, `room_num`, `guest_name`,`guest_tel`,`order_state`,`create_time`,`price`) VALUES (?)";
  const values = [
    req.body.user_id,
    req.body.hotel_id,
    req.body.start_date,
    req.body.end_date,
    req.body.room_num,
    req.body.guest_name,
    req.body.guest_tel,
    req.body.order_state,
    req.body.create_time,
    req.body.price,
  ];
  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

const getOrderDetail = (req, res) => {
  const q =
    "SELECT * FROM order_info JOIN hotel_info on order_info.hotel_id = hotel_info.hotel_id WHERE order_id=?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[0]);
  });
};

const setOrder = (req, res) => {
  const q = "UPDATE order_info SET order_state=? WHERE order_id=?";
  db.query(q, [req.body.state, req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[0]);
  });
};

const getMyOrder = (req, res) => {
  const q =
    "SELECT * FROM order_info JOIN hotel_info on order_info.hotel_id = hotel_info.hotel_id WHERE user_id=? order by order_id DESC";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

const getPay = (req, res) => {
  const q =
    "SELECT * FROM order_info JOIN hotel_info on order_info.hotel_id = hotel_info.hotel_id WHERE user_id=? AND order_state=? order by order_id DESC ";
  db.query(q, [req.body.userId, req.body.state], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

module.exports = { addOrder, getOrderDetail, setOrder, getMyOrder, getPay };

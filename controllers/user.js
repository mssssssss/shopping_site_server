var db = require("../db.js");
var jwt = require("jsonwebtoken");

const login = (req, res) => {
  const q = "SELECT * FROM user_info WHERE user_name = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    //Check password
    // const isPasswordCorrect = bcrypt.compareSync(
    //   req.body.password,
    //   data[0].password
    // );

    if (req.body.password !== data[0].password)
      return res.status(400).json("Wrong username or password!");

    const token = jwt.sign({ id: data[0].id }, "jwtkey");
    const { password, ...other } = data[0];

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};

const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out.");
};

const setMoney = (req, res) => {
  const q = "UPDATE user_info SET `user_balance`=? WHERE `user_id` = ?";
  db.query(q, [req.body.money, req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json("Post has been updated.");
  });
};

const getMoney = (req, res) => {
  const q = "SELECT user_balance FROM user_info WHERE user_id = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[0]);
  });
};

module.exports = { login, logout, setMoney, getMoney };

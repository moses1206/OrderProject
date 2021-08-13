const express = require('express');
const router = express.Router();
const { OrderModel } = require('../models/OrderModel');

const { auth } = require('../middleware/auth');

//=================================
//             Orders
//=================================

router.post('/', (req, res) => {
  const order = new OrderModel(req.body);

  order.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

module.exports = router;

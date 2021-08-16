const express = require('express');
const router = express.Router();
const { OrderModel } = require('../models/OrderModel');

const { auth } = require('../middleware/auth');

//=================================
//             Orders
//=================================

router.post('/', auth, (req, res) => {
  const order = new OrderModel(req.body);

  order.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

router.get('/getorders', auth, (req, res) => {
  OrderModel.find()
    .populate('writer')
    .exec((err, ordersInfo) => {
      if (err) return res.status(400).json({ success: false, err });

      return res.status(200).json({ success: true, ordersInfo });
    });
});

module.exports = router;

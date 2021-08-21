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

router.post('/deleteorder', auth, (req, res) => {
  console.log(req.body);
  OrderModel.findOneAndDelete({
    _id: req.body.orderId,
    writer: req.body.userId,
  }).exec((err, result) => {
    if (err) return res.status(400).send(err);

    return res.status(200).json({ success: true, result });
  });
});

router.post('/updateorder', auth, (req, res) => {
  console.log(req.body);

  OrderModel.findOneAndUpdate(
    { _id: req.body._id },
    {
      order_detail: req.body.order_detail,
      total_quantity: req.body.total_quantity,
      total_price: req.body.total_price,
      address: req.body.address,
      delivery_date: req.body.delivery_date,
      delivery_time: req.body.delivery_time,
    },
    { upsert: true }
  ).exec((err, result) => {
    if (err) return res.status(400).send(err);

    return res.status(200).json({ success: true, result });
  });
});

module.exports = router;

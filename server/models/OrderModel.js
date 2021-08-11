const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderModelSchema = mongoose.Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    order_detail: {
      type: Array,
    },
    total_quantity: {
      type: String,
    },
    total_price: {
      type: Number,
    },
    address: {
      type: String,
    },
    delivery_date: {
      type: Date,
      required: true,
    },

    delivery_time: {
      type: String,
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model('OrderModel', orderModelSchema);

module.exports = { OrderModel };

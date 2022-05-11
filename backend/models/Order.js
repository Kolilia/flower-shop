const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Order = new Schema({
  flowersIds: [{ type: String, ref: `Flower` }],
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  execute: { type: Boolean, default: false },
});

Order.index({
  address: "text",
  city: "text",
  postalCode: "text",
});

Order.plugin(mongoosePaginate);

module.exports = model("Order", Order);

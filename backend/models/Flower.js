const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Flower = new Schema({
  name: { type: String, required: true },
  imageHref: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, required: true },
});

Flower.index({
  name: "text",
  imageHref: "text",
  price: "text",
});

Flower.plugin(mongoosePaginate);

module.exports = model("Flower", Flower);

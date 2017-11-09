const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const ProductSchema = new Schema({
  name       : { type: String, required: [true, 'A donde vas sin nombre'] },
  price      : Number,
  imageUrl   : String,
  description: String,
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;

const cache = require('./cache');

function Product({ id, name, prices = {} }) {
  this.id = id;
  this.name = name;
  this.price = prices.price;
};

Product.retrieve = () => {
  const product = cache.get('product');
  if (!product) throw new Error('No Product in cache');
  return product;
};

module.exports = Product;
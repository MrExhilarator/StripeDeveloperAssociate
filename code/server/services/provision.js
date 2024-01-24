const Product = require('./product'),
      Price = require('./price'),
      cache = require('./cache'),
      stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const T_SHIRT_PRODUCT_NAME = 'The Afrobeatles T-Shirt',
      T_SHIRT_PRODUCT_DESC = 'Afrobeatles Tour',
      T_SHIRT_LOOKUP_KEY = process.env.CHALLENGE_ID,
      T_SHIRT_URL = process.env.CHALLENGE_ID,
      T_SHIRT_COST = 2500;

// Milestone 1
const provision = async () => {
  try {
    // Clear in-memory cache
    cache.flushAll();

    // Check if Product exists with correct shape in Stripe Account
    let product = await findProduct(T_SHIRT_URL);

    if (product) {
      // Lookup Associate Challenge price
      price = await findPrice(product.id, [T_SHIRT_LOOKUP_KEY]);

      // Throw error if either Price doesn't exist
      if (!price) {
        price = await createPrice(product.id, T_SHIRT_COST, T_SHIRT_PRODUCT_NAME, T_SHIRT_LOOKUP_KEY);
      }

    } else {
      // Product does not exist in Stripe, create it and its Prices
      product = await createProduct(T_SHIRT_PRODUCT_NAME, T_SHIRT_PRODUCT_DESC, T_SHIRT_URL);
      price = await createPrice(product.id, T_SHIRT_COST, T_SHIRT_PRODUCT_NAME, T_SHIRT_LOOKUP_KEY);
    }

    if (!product || !price) {
      console.error('TODO: Implement provisioning service to create a Product & Price');
    } else {
      product.price = price;
      cache.set('product', product);
    }
  } catch (error) {
    throw new Error(`Provisioning error: ${error}`);
  }
};

/**
 * Milestone 1
 * Find Stripe Product based on URL. Returns Stripe Product if found else null.
 * @returns {Product}
 */
const findProduct = async (url) => {
  const response = await stripe.products.list();
  //console.log(response,"list products response");
  const product = response.data.find(product => product.url === url);
  //console.log(product, "founded product");
  if (product) {
    return product;
  }
  // TODO: Return Product
  return null;
};
/**
 * Milestone 1
 * Find Stripe Price for the Product Id
 * @param {string} productId 
 * @param {string} lookupKey 
 * @returns {Price} price
 */
const findPrice = async (productId, lookupKey) => {
  const response = await stripe.prices.list();
  //console.log(response,"list prices response");
  const price = response.data.find(price => price.product === productId);
  //console.log(price, "founded price");
  // TODO: Return Price
  return price;
};

/**
 * Milestone 1
 * Create Stripe Product
 * @param {string} name 
 * @param {string} description 
 * @param {string} url
 * @returns {Product} product
 */
const createProduct = async (name, description, url) => {
  const product = await stripe.products.create({
    name: name,
    description: description,
    url: url,
  });
  //console.log(product, "create product response");
  // TODO: Return Product
  return product;
};

/**
 * Milestone 1
 * Create Price in Stripe associated to the Product. 
 * We may want to adjust the details of this price over time, without having to change how we refer to it, so use the transfer_lookup_key parameter.
 * @param {string} product 
 * @param {integer} unit_amount 
 * @param {string} nickname 
 * @param {string} lookup_key 
 * @returns {Price} price
 */
const createPrice = async (product, unit_amount, nickname, lookup_key) => {
  const price = await stripe.prices.create({
    currency: 'usd',
    unit_amount: unit_amount,
    product: product,
    nickname: nickname,
    lookup_key: lookup_key,
  });
  //console.log(price, "create price response");
  // TODO: Return Price
  return price;
};


module.exports = provision;
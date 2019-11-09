const { Products } = require('../models');
const { validateProductInput } = require('../core/validation/product');
exports.createProduct = async (req, res, next) => {
  console.log('inside create product');

  const errors = validateProductInput(req.body);
  try {
    if (Object.keys(errors).length) {
      return res.status(403).json({ errors });
    }
    const product = await new Products(req.body);

    await product.save();
    res
      .status(200)
      .json({ product: product, message: 'product create success' });
  } catch (err) {
    errors.global = 'something went wrong :/';
    return res.status(500).json({ errors });
  }
};

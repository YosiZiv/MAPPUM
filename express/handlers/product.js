const { Product } = require('../models');
const { validateProductInput } = require('../core/validation/product');
exports.createProduct = async (req, res, next) => {
  const {
    user: { _id: userId },
    body,
  } = req;
  const errors = validateProductInput(req.body);

  if (Object.keys(errors).length) {
    return res.status(403).json({ errors });
  }
  const newProduct = await new Product({
    ...body,
    userId,
  });

  await newProduct
    .save()
    .then(dbProduct => {
      if (!dbProduct) {
        errors.global = 'something went wrong :/';
        return res.status(400).json();
      }
      res
        .status(200)
        .json({ product: newProduct, message: 'product create success' });
    })
    .catch(error => {
      console.log(error);
      errors.global = 'something went wrong :/';
      return res.status(500).json({ errors });
    });
};

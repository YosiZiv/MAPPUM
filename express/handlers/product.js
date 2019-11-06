const { Products } = require('../models');

exports.createProduct = async (req, res, next) => {
  const errors = validateProductInput(req.body);
  try {
    if (Object.keys(errors).length) {
      return res.status(403).json({ errors });
    }
    const productSavedToDatabase = await new Products(req.body);

    await productSavedToDatabase.save();
    res
      .status(200)
      .json({ product: productSavedToDatabase, message: 'מוצר נרשם בהצלחה' });
  } catch (err) {
    errors.global = 'something went wrong :/';
    return res.status(500).json({ errors });
  }
};

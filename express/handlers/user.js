const { Sales, User } = require('../models');

exports.getSell = async (req, res, next) => {
  try {
    const ObjectId = require('mongoose').Types.ObjectId;
    const sales = await Sales.find({ user: new ObjectId(req.body.id) });
    res.status(200).json({ sales });
  } catch (err) {
    const error = new Error('אופס משהו השתבש נסו שוב מאוחר יותר');
    return next(error);
  }
};

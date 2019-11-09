const { Sales, Products, User } = require('../models');

exports.getUserActiveSales = async (req, res, next) => {
  try {
    const ObjectId = require('mongoose').Types.ObjectId;
    const sales = await Sales.find({ user: new ObjectId(req.body.id) });
    res.status(200).json({ sales });
  } catch (err) {
    const error = new Error('אופס משהו השתבש נסו שוב מאוחר יותר');
    return next(error);
  }
};
exports.getSaleById = async (req, res, next) => {
  try {
    const sale = await Sales.findById({
      _id: req.params.id,
      active: true,
    });
    res.status(200).json({ sale });
  } catch (err) {
    const errors = {};
    errors.message = new Error('אופס משהו השתבש :/ ');
    errors.status = 400;
    next(errors);
  }
};
exports.sellComplete = async (req, res, next) => {
  try {
    const { productId, userId } = req.body;
    const updateProduct = await Products.updateOne(
      {
        _id: productId,
      },
      {
        $push: {
          users: userId,
        },
      },
    );
    const getProduct = await Products.findById({ _id: productId });

    const sale = await new Sales({
      user: userId,
      productName: getProduct.name,
      description: getProduct.description,
      sellPrice: getProduct.sellPrice,
    });
    await sale.save();
    const updateUser = await User.updateOne(
      {
        _id: userId,
      },
      {
        $push: {
          sales: sale._id,
        },
      },
    );
    const pdfData = {
      orderId: sale._id,
      firstName: updateUser.firstName,
      lastName: updateUser.lastName,
      phone: updateUser.phone1,
      email: updateUser.email,
      address: updateUser.address,
      productName: sale.productName,
      description: sale.description,
      sellPrice: sale.sellPrice,
    };
    const pathToPdf = getPath + '/' + pdfData.orderId + '.pdf';
    const pdfPath = await pdf(pathToPdf, pdfData);
    const pdfMessage = makeMailMessage(pdfData);
    const getPdf = await sendPdfToMail(pdfPath, pdfData.email, pdfMessage);
    res.status(201).json({ message: 'רכישה בוצעה בהצלחה' });
  } catch (err) {
    const error = new Error('אופס משהו השתבש נסו שוב מאוחר יותר');
    return next(error);
  }
};

exports.changeSaleStage = async (req, res, next) => {
  await Sales.findByIdAndUpdate(
    {
      _id: req.body.params,
    },
    {
      $set: {
        stage: req.body.bodyData,
      },
    },
    { upsert: true },
    (err, updateSale) => {
      if (err) {
        errors.posts = 'לא נמצא מכירה';
        return res.status(400).json({ errors });
      }
      return updateSale.save();
    },
  )
    .then(newSale => {
      if (!newSale) {
        errors.message = new Error('מכירה לא נמצאה');
        return next(errors);
      }
      return res.status(200).json({ newSale: newSale.stage });
    })
    .catch(() => {
      const error = new Error(
        'קרתה תקלה בעת ניסיון לעדכן כתבה הנה נסו שוב מאוחר יותר',
      );
      error.status = 400;
      return next(error);
    });
};
exports.getAllActiveSells = async (req, res, next) => {
  const { currentPage, itemPerPage } = req.query;
  const query = {};
  if (currentPage <= 0) {
    const error = new Error('דף נוכחי לא נמצא');
    error.status = 302;
    return next(error);
  }
  try {
    const countSales = await Sales.countDocuments()
      .where('active')
      .equals(true);
    query.skip = +itemPerPage * (currentPage - 1);
    query.limit = +itemPerPage;

    const sales = await Sales.find({}, {}, query)
      .where('active')
      .equals(true);

    return res.status(200).json({ sales, countSales });
  } catch (err) {
    const error = new Error('אופס משהו השתבש');
    error.status = 400;
    return next(error);
  }
};

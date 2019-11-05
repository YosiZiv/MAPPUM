const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const hbs = require('handlebars');
const { Products, User, Sales } = require('../models');
const puppeteer = require('puppeteer');
const getPath = path.join(process.cwd(), 'public');

const { sendPasswordToMail, sendPdfToMail } = require('./email');
const { validateRegisterInput } = require('../validation/auth');
const { validateProductInput } = require('../validation/dashboard');

const makeMailMessage = ({
  orderId,
  firstName,
  lastName,
  productName,
  description,
  sellPrice,
}) => {
  return (message = `
<table style = "width: 600px; margin: 0 auto;">
<p>${orderId}</p>
<h4 style = "color: blue; text-align: center; ">שלום ${firstName +
    ' ' +
    lastName} </h4>
<h4 style = "color: black; text-align: center;">תודה על הזמנתם למייל זה מצורף קובץ pdf עם פרטי ההזמנה</h4>
<h4>${productName}</h4>
<span style = "color: black; text-align: center;">${description}</span>
<span style = "color: black; text-align: center;">${sellPrice}</span>
</table>
`);
};

const compile = async function(tamplte, data) {
  const filePath = getPath + tamplte;
  const html = await fs.readFileSync(filePath, 'utf-8');
  return hbs.compile(html)(data);
};

async function pdf(url, data) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const content = await compile('/sale.hbs', data);
    await page.setContent(content);
    await page.emulateMedia('screen');
    await page.pdf({
      path: url,
      format: 'A4',
      landscape: true,
      printBackground: true,
    });
    await browser.close();
    return url;
  } catch (e) {
    console.log('i get an error', e);
  }
}

async function pdf(url, data) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const content = await compile('/sale.hbs', data);
    await page.setContent(content);
    await page.emulateMedia('screen');
    await page.pdf({
      path: url,
      format: 'A4',
      landscape: true,
      printBackground: true,
    });
    await browser.close();
    return url;
  } catch (e) {
    console.log('i get an error', e);
  }
}
exports.createProduct = async (req, res, next) => {
  const errors = validateProductInput(req.body);
  try {
    if (Object.keys(errors).length) {
      return res.status(403).json({ errors });
    }
    const productSavedToDatabase = await new Products(req.body);
    console.log('look at productSaved', req.body, productSavedToDatabase);

    await productSavedToDatabase.save();
    res
      .status(200)
      .json({ product: productSavedToDatabase, message: 'מוצר נרשם בהצלחה' });
  } catch (err) {
    console.log(err);
    errors.global = 'someting went wrong :/';
    return res.status(500).json({ errors });
  }
};

exports.getAllActiveSells = async (req, res, next) => {
  const { currentPage, itemPerPage } = req.query;
  const query = {};
  console.log('inside getposts handler', currentPage, itemPerPage);

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
    console.log(query);
    const sales = await Sales.find({}, {}, query)
      .where('active')
      .equals(true);
    console.log(sales);
    return res.status(200).json({ sales, countSales });
  } catch (err) {
    console.log(err);
    const error = new Error('אופס משהו השתבש');
    error.status = 400;
    return next(error);
  }
};
exports.changeSaleStage = async (req, res, next) => {
  console.log(req.body);
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
exports.getSaleById = async (req, res, next) => {
  console.log('inside new function sales', req.params.id);
  try {
    const sale = await Sales.findById({
      _id: req.params.id,
      active: true,
    });
    res.status(200).json({ sale });
  } catch (err) {
    console.log(err);
    const errors = {};
    errors.message = new Error('אופס משהו השתבש :/ ');
    errors.status = 400;
    next(errors);
  }
};
exports.sellComplate = async (req, res, next) => {
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
    console.log(getProduct);
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
    console.log(err);
    const error = new Error('אופס משהו השתבש נסו שוב מאוחר יותר');
    return next(error);
  }
};

exports.getUserByEmail = (req, res, next) => {
  const { email } = req.body;
  console.log('function work ', email);

  const errors = {};
  // const errors = validateLoginInput(req.body);
  // if (Object.keys(errors).length) {
  //   return res.status(400).json({ errors });
  // }
  //  Find user by email
  User.findOne({ email })
    .then(dbUser => {
      // Check for User
      if (!dbUser) {
        errors.global = 'user didnt found please sign new user';
        return res.status(400).json({ errors });
      }
      return res.status(200).json({ user: dbUser });
    })
    .catch(err => {
      console.log(err);
      errors.global = 'Something went wrong :/';
      return res.status(400).json({ errors });
    });
};

exports.getAdminsUsers = async (req, res, next) => {
  const errors = {};
  try {
    const { admin } = req.body;
    console.log(admin);

    const emails = [];
    const users = await User.find({}).select('email');
    users.forEach(user => {
      emails.push(user['email']);
    });
    res.status(200).json({ emails });
  } catch (err) {
    console.log(err);
    errors.global = 'Something went wrong :/';
    return res.status(400).json({ errors });
  }
};

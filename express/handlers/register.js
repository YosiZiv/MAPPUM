//  Register User Handle function
const path = require('path');
const bcrypt = require('bcryptjs');
const { User, Admin } = require('../models');

const { sendPasswordToMail } = require('./mail');
const {
  validateRegisterInput,
  validateAdminRegisterInput,
} = require('../validation/auth');

exports.registerUser = async (req, res, next) => {
  const errors = validateRegisterInput(req.body);
  try {
    if (Object.keys(errors).length) {
      return res.status(403).json({ errors });
    }
    const {
      firstName,
      lastName,
      zahot,
      phone,
      address,
      email,
      admin,
    } = req.body;
    //  Check if email already exists
    let user = await User.findOne({ email });
    if (user) {
      errors.global = 'email allready exsist';
      return res.status(400).json({ errors });
    }
    user = await User.findOne({ zahot });
    if (user) {
      errors.global = 'id allready exsist';
      return res.status(400).json({ errors });
    }
    // GENERETE RANDOM 6 NUMBERS FOR INIT PASSWORD
    const initPassword = Math.floor(100000 + Math.random() * 900000);

    //  Create new user
    const newUser = await new User({
      firstName,
      lastName,
      zahot,
      phone,
      address,
      email,
      password: initPassword,
    });
    //  Hash the password
    await bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, async (e, hash) => {
        if (e) {
          errors.bcrypt = 'someting went wrong :/';
          return res.status(400).json({ errors });
        }
        newUser.password = hash;
        await newUser.save();
        await sendPasswordToMail(
          newUser.firstName,
          newUser.email,
          initPassword,
        );
        const result = await makeAdminUserRelation(newUser._id, admin);
        console.log(result);

        if (!result) {
          errors.global = 'someting went wrong :/';
          return res.status(400).json({ errors });
        }
        return res
          .status(201)
          .json({ user: newUser, message: 'משתמש נרשם בהצלחה' });
      });
    });
  } catch (err) {
    errors.global = 'someting went wrong :/';
    return res.status(500).json({ errors });
  }
};
const makeAdminUserRelation = async (user, admin) => {
  console.log(user, admin);

  const updateAdmin = await Admin.updateOne(
    {
      _id: admin,
    },
    {
      $push: {
        users: user,
      },
    },
  );
  const updateUser = await User.updateOne(
    {
      _id: user,
    },
    {
      $push: {
        admins: admin,
      },
    },
  );
  if (!updateAdmin || !updateUser) {
    return false;
  }
  return true;
};
exports.registerAdmin = async (req, res, next) => {
  const errors = validateAdminRegisterInput(req.body);

  if (Object.keys(errors).length) {
    return res.status(403).json({ errors });
  }
  const {
    firstName,
    lastName,
    phone,
    email,
    password,
    passwordConfirm,
  } = req.body;
  console.log(firstName, lastName, phone, email, password, passwordConfirm);
  //  Check if email already exists
  try {
    let admin = await Admin.findOne({ email });
    if (admin) {
      errors.global = 'email allready exsist';
      return res.status(400).json({ errors });
    }
    // GENERETE RANDOM 6 NUMBERS FOR INIT PASSWORD
    //  Create new user
    const newAdmin = await new Admin({
      firstName,
      lastName,
      phone,
      email,
      password: password,
    });
    console.log(newAdmin);

    //  Hash the password
    await bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newAdmin.password, salt, async (e, hash) => {
        if (e) {
          errors.bcrypt = 'someting went wrong :/';
          return res.status(400).json({ errors });
        }
        newAdmin.password = hash;
        await newAdmin.save();
        return res
          .status(201)
          .json({ admin: newAdmin, message: 'Admin Sign Up Success' });
      });
    });
  } catch (err) {
    errors.global = 'someting went wrong :/';
    return res.status(500).json({ errors });
  }
};

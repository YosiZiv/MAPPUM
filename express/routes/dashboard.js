const express = require('express');

const router = express.Router();
const {
  createProduct,
  register,
  sellComplate,
  getAllActiveSells,
  getSaleById,
  changeSaleStage,
  getUserByEmail,
  getAllUserEmails,
} = require('../handlers/dashboard');
const { adminCheckToken } = require('../middlewares/admin');
router.get('/getallemails', adminCheckToken, getAllUserEmails);
router.get('/getsale/:id', adminCheckToken, getSaleById);
router.get('/getactivesale', adminCheckToken, getAllActiveSells);
router.post('/getuserbyemail', adminCheckToken, getUserByEmail);
router.post('/updatestage', adminCheckToken, changeSaleStage);
router.post('/sellcomplate', adminCheckToken, sellComplate);
router.post('/register', adminCheckToken, register);
router.post('/createitem', adminCheckToken, createProduct);
module.exports = router;

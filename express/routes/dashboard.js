const express = require('express');

const router = express.Router();
const {
  createProduct,
  sellComplate,
  getAllActiveSells,
  getSaleById,
  changeSaleStage,
  getUserByEmail,
  getAdminsUsers,
} = require('../handlers/dashboard');
const { adminCheckToken } = require('../middlewares/admin');
router.post('/getadminsusers', adminCheckToken, getAdminsUsers);
router.get('/getsale/:id', adminCheckToken, getSaleById);
router.get('/getactivesale', adminCheckToken, getAllActiveSells);
router.post('/getuserbyemail', adminCheckToken, getUserByEmail);
router.post('/updatestage', adminCheckToken, changeSaleStage);
router.post('/sellcomplate', adminCheckToken, sellComplate);
router.post('/createitem', adminCheckToken, createProduct);
module.exports = router;

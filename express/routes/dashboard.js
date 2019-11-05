const express = require('express');

//  middleware
const asyncMiddleware = require('../middleware/async');
const { adminCheckToken } = require('../middleware/admin');

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
router.post(
  '/getadminsusers',
  adminCheckToken,
  asyncMiddleware(getAdminsUsers),
);
router.get('/getsale/:id', adminCheckToken, asyncMiddleware(getSaleById));
router.get(
  '/getactivesale',
  adminCheckToken,
  asyncMiddleware(getAllActiveSells),
);
router.post(
  '/getuserbyemail',
  adminCheckToken,
  asyncMiddleware(getUserByEmail),
);
router.post('/updatestage', adminCheckToken, asyncMiddleware(changeSaleStage));
router.post('/sellcomplate', adminCheckToken, asyncMiddleware(sellComplate));
router.post('/createitem', adminCheckToken, asyncMiddleware(createProduct));
module.exports = router;

const express = require('express');
const { adminLogin , } = require('../controllers/admincontroller');

const router = express.Router();

router.post('/admin/login', adminLogin);


module.exports = router;

const express = require('express');
const { adminLogin ,updateAdminDetails } = require('../controllers/admincontroller');

const router = express.Router();

router.post('/admin/login', adminLogin);
router.put('/admin/update', updateAdminDetails); 


module.exports = router;

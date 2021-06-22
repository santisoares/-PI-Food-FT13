const { Router } = require('express');
const {dietTypes} = require('../controllers/diet');
const router = Router();

router.get('/', dietTypes)


module.exports = router;
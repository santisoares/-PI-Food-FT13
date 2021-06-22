const { Router } = require('express');
const {getNine, getId} = require('../controllers/recipe.js');
const router = Router();
// router.post('/recipe', addRecipe)

router.get('/', getNine)
router.get('/:id', getId)

module.exports = router;


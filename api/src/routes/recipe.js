const { Router } = require('express');
const router = Router();
const {postRecipe} = require('../controllers/recipe.js')
const { v4: uuid } = require('uuid');
// router.post('/recipe', addRecipe)

router.post('/', postRecipe)


module.exports = router;


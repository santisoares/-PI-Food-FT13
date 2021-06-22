const { Router } = require('express');
const router = Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const DietRoutes = require('./diet')
const RecipesRoutes = require('./recipes.js')
const RecipeRoutes = require ('./recipe')
const DietRoutes = require('./diet.js')


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes', RecipesRoutes)
router.use('/recipe', RecipeRoutes )
// router.use('/diet', DietRoutes)
router.use('/types', DietRoutes)



module.exports = router;

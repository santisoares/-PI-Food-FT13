const {Recipe, Diet} = require('../db');
const{BASE_URL, RECEPE_DETAIL, BASE_NEXT, GET_RECETA_INFO,} = require('../../constants');
const axios = require('axios');
require('dotenv').config;
const {API_KEY} = process.env;
const { v4: uuid } = require('uuid');

// const { Router } = require('express');
// const router = Router();

const getNine = async (req, res) => {
    const {name} = req.query;
    if (!name) {
    const apiRecipes = axios.get(`https://api.spoonacular.com/recipes/complexSearch?&addRecipeInformation=true&${API_KEY}&number=20`)
    const dbRecipes = Recipe.findAll( { include: Diet })
    Promise.all([apiRecipes, dbRecipes])
    .then(r => {
        let [apiResponse, recipeBD] = r;
        const response = apiResponse.data.results
        const ultimateRecipes = response.map(r =>({
        id: r.id,
        img: r.image? r.image:null,
        title: (r.title ? r.title : r.name),
        diet: r.diet? r.diet:r.diets,
        spoonacularScore: (r.score ? r.score : r.spoonacularScore) 
        }));
        let a = recipeBD.map(recipe => {
            let {id, title, spoonacularScore, summary, healthScore, instructions} = recipe;
            let dieta = [];    
            const diets = recipe.dataValues.diet||recipe.dataValues.diets
            if (diets!== undefined){diets.forEach(e=>dieta.push(e.dataValues.name))
            ultimateRecipes.push({id, title, spoonacularScore, summary, healthScore, instructions, diets: dieta})
            } else {ultimateRecipes.push({id, title, spoonacularScore, summary, healthScore, instructions, diets: recipe.diet? recipe.diet:recipe.diets})}
        })
        res.send(ultimateRecipes)

    })
.catch(err => console.error(err));
    }
    const recipesArray = [];
    // const nueve= [];
    try {
        const recipeResponses = await axios.get(`${BASE_URL}${BASE_NEXT}?${RECEPE_DETAIL}&${API_KEY}&number=20`);
        recipeResponses.data.results.forEach(recipe => {
            let {id, title, spoonacularScore, summary, healthScore, instructions, diets, image} = recipe;
            if (recipe.title.toLowerCase().includes(name)){ 
                recipesArray.push({id, title, diets, spoonacularScore, summary, healthScore, instructions, image})
            }
        });


        const recipeBD = await Recipe.findAll({include: Diet});
      // const dbRecipes = Recipe.findAll({where: {name: {[Op.like]: `%${name}%`}}, include: Diet})
        // console.log(recipeBD[0].dataValues.diets[0].dataValues.name)
        //este es el array que tengo que enviar: recipePropias[0].dataValues.diets[0]
        recipeBD.forEach(recipe => {
             let {id, title, spoonacularScore, summary, healthScore, instructions} = recipe;
             if (recipe.title.toLowerCase().includes(name)){ 
                const diet = [];
                const diets = recipe.dataValues.diets?recipe.dataValues.diets:recipe.dataValues.diet
                diets.forEach(e=>diet.push(e.dataValues.name))
                recipesArray.push({id, title, spoonacularScore, summary, healthScore, instructions, diets: diet})
             }
       
        // const recipeBD = await Recipe.findAll();
        // recipeBD.forEach(recipe => {
        //     let {id, title, diets, spoonacularScore, summary, healthScore, instructions} = recipe;
        //     if (recipe.title.toLowerCase().includes(name)){ 
        //         recipesArray.push({id, title, diets, spoonacularScore, summary, healthScore, instructions})
        //     }
        });
      
        if(recipesArray.length>0){
            res.send(recipesArray)
        }else {res.status(404).send('the recepe you search does not exist')}
    }
    catch (error) {
        console.log(error);
        return res.status(500);
    }  
};

const getId =  async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(404).send("missing id parameter");
    try {
        if (id.length>20){
        const dbQuery = await Recipe.findAll({include:Diet});
        // console.log(dbQuery)
        
        let y=dbQuery.filter(e=> e.dataValues.id === id) 
        let c = []
        y[0].dataValues.diets.forEach(e=> c.push(e.dataValues.name))
        

        /*
        let a = recipeBD.map(recipe => {
            let {id, title, spoonacularScore, summary, healthScore, instructions} = recipe;
            let dieta = [];    
            const diets = recipe.dataValues.diet||recipe.dataValues.diets
            if (diets!== undefined){diets.forEach(e=>dieta.push(e.dataValues.name))
            ultimateRecipes.push({id, title, spoonacularScore, summary, healthScore, instructions, diets: dieta})
        */
        let {title, summary, spoonacularScore, healthScore, instructions} = y[0].dataValues;
        if(title){res.send({title, diet: c, summary, spoonacularScore, healthScore, instructions})}
    } else {
        const recipeDetailResponse = await axios.get(`${BASE_URL}/${id}/information?${API_KEY}`);
        console.log('menos')
        let { title,  image, spoonacularScore, healthScore, diets, summary, analyzedInstructions } = recipeDetailResponse.data;
        res.send({title,image,summary,analyzedInstructions,spoonacularScore, healthScore, diets });  
    }
    }
    
    catch (error) {  
        res.status(404).send("The id doesn't exist");
    }
}

let ids = 10;

const postRecipe = async (req, res, next)=>{
    const id = uuid();
    let array = [];
    const { title, summary, spoonacularScore, healthScore, instructions, diets} = req.body;
    if (Array.isArray(diets)){
        for(let i=0; i<diets.length; i++){
            let name = diets[i];
            let dietBD = await Diet.findOrCreate({
                where: {name},
                defaults: {name, id:(ids = ids+1)}
            })
            // console.log(ids);
            array.push(dietBD[0].dataValues.id)
        }
    } else { 
         const dietBD2 = await Diet.findOrCreate({
            where: {diets},
            defaults: {diets, id:(ids = ids+1)}
            })
            array.push(dietBD2[0].dataValues.id)
        }
    const sentRecipe = { 
        title, 
        summary, 
        spoonacularScore, 
        healthScore, 
        instructions, 
        id,
    };
    if(!sentRecipe) return res.send('Dato No Valido');
    try{
        const newRecipe = await Recipe.create(sentRecipe);
        // si diets es un array le aplicamos for, sino, le hacemos lo mismo
        /*
        await Diet.findOrCreate({
            where: {diet[i]},
            defaults: {diet[i], id}
            })
        */
       array.forEach(e=>{
           newRecipe.setDiets(e);
       })
        arry = [];
        // console.log(newRecipe);
        return res.send(newRecipe);
    }catch (err){
        next(err);
    }
}

// };




module.exports = {
    getNine,
    getId,
    postRecipe
    // removeRecipe,
    // editRecipe,
    // findRecipe
}





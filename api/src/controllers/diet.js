const {Diet} = require('../db');
const{BASE_URL, RECEPE_DETAIL, BASE_NEXT} = require('../../constants');
const axios = require('axios');
require('dotenv').config;
const {API_KEY} = process.env;
const { v4: uuid } = require('uuid');
//https://api.spoonacular.com/recipes/complexSearch?apiKey=40eb347614844e4ebd3af15d526c3d7e&addRecipeInformation=true

const dietTypes = async(req, res)=>{
//  const r=[];
//  const d = [];
 try{ 
     //if(Diet.length>8) {return 'hola';};// hay que hacer esto!!!!!!!!!!!!!!!!!!!!!!!! que no se boorre la base de datos!
    const dbQuery = await Diet.findAll()
        // if(dbQuery.length > 9) {
            return res.json(dbQuery)
        // }
    // const apiResponse = await axios.get(`${BASE_URL}${BASE_NEXT}?addRecipeInformation=true&${API_KEY}`);
    // apiResponse.data.results.forEach(recipe => r.push(recipe));
    // r.forEach(recipe=>{
    //     if(recipe.diets.length>0){
    //         for(let i=0; i<recipe.diets.length; i++){
    //             let diet = recipe.diets[i];
    //             if(!d.includes(diet)){d.push(diet)};
    //         }
    //     }
    // })
    // for(let i=0; i<d.length; i++){
    //     const name = d[i];
    //     const id = uuid();
    //     await Diet.findOrCreate({
    //         where: {name},
    //         defaults: {name, id}
    //         })
    // }
    // return res.send('diets added')
    // d.forEach(diet=>{
    //     const name = diet;
    //     const id = uuid();
    //     Diet.create({id, name});
    //     return res.send('diets added')
    // })
 }
 catch{
    res.status(404).send('nothing new to submit')
 }
};

module.exports = {
    dietTypes,

}
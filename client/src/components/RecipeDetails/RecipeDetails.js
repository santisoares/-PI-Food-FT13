import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './RecipeDetails.css';
import { Link } from 'react-router-dom';

function RecipeDetails({ recipe, diets }) {
  const renderHTML = (rawHTML) =>
    React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });
  const [r, setRecipe] = useState({})
  useEffect(() => {
    setRecipe(recipe)
  }, [recipe])
  useEffect(() => {
    return setRecipe({})
  }, [])
  if (r.title !== undefined) {
    return (
      <div id='Details'>
       <p>{console.log(r)}</p> 
        <button className='BackButton' onClick={() => setRecipe({})}><Link className='Link' to='/home'>Home</Link></button>
        <div id='Info'>
          <h2>{r.title}</h2>
          <h4>Health Score: {r.healthScore}</h4>
          <h4>Score: {r.spoonacularScore}</h4>
          <div className='Diets'>
          {diets.filter(d => {return r.diets.includes(d.name.toLowerCase()) || r.diets.find(diet => d.name === diet.name)})
          .map(d => <h5 className='diets' key={d.id}>{d.name}</h5>)}
          </div>
          <img id='RecipeImage' src={r.img? r.img:r.image} alt='aiudaaa' />
          <div id='SummaryAndSBS'>
          {renderHTML(r.summary)}
            </div>
            <div id='instructions'>
            <p id='ins'> Instructions:</p>
            <ol id='h6'>
            {(r.analyzedInstructions[0].steps.map(d => <li key={d.number} >{d.step}</li>))}
            </ol>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <p></p>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    recipe: state.recipeDetail,
    diets: state.allDiets
  }
}

export default connect(mapStateToProps)(RecipeDetails)
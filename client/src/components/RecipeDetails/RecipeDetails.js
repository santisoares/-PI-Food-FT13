import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './RecipeDetails.css';
import { Link } from 'react-router-dom';
import foto from '../foto/image.jpg'

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
          {/*   {props.diets.filter(d => {if (props.diet !== undefined){return props.diet.includes(d.toLowerCase()) || props.diet.find(diet => d === diet)}
      else{return props.diets}})
        .map(d => <span className='diets' >{d?d:props.diet}</span>)} */}
          {diets.filter(d => {return r.diets!==undefined?r.diets.includes(d.toLowerCase()):
          r.diet.includes(d.toLowerCase()) 
          || r.diet?r.diet.find(diet => d === diet):
          r.diets.find(diet=>d===diet)})
          .map(d => <h5 className='diets' key={d}>{d}</h5>)}
          </div>
          <img id='RecipeImage' src={r.img? r.img:r.image?r.image:foto} alt='aiudaaa' />
          <div id='SummaryAndSBS'>
          {renderHTML(r.summary)}
            </div>
            <div id='instructions'>
            <p id='ins'> Instructions:</p>
            <ol id='h6'>
            {(r.instructions?r.instructions.map(d => <li key={d} >{d}</li>)
            :r.analyzedInstructions[0].steps.map(d => <li key={d.number} >{d.step}</li>))}
           {/* r.instructions.map(d => <li key={d.number} >{d.step}</li>) */}
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
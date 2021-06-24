// import React, { useState, useEffect } from 'react';
import './Recipe.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { searchRecipeDetail } from '../../redux/Actions'
import foto from '../foto/image.jpg'

function Recipe(props) {
return (
  <div className='Recipe' >
    <h3 className='RecipeName'>{props.title}</h3>
    <div className='RecipeInfo'><div className='Diets'>
      {/* {props.diets.filter(d => {return (props.diet !== undefined)?props.diet.includes(d.name.toLowerCase()) || props.diet.find(diet => d.name === diet.name): props.diet})
        .map(d => <span className='diets' key={d.id}>{d.name?d.name:props.diet}</span>)} */}
        
    {props.diets.filter(d => {if (props.diet !== undefined){return props.diet.includes(d.toLowerCase()) || props.diet.find(diet => d === diet)}
      else{return props.diets}})
        .map(d => <span className='diets' >{d?d:props.diet}</span>)}
        

         {/*{props.diets.filter(d => {return props.diet.forEach(e=>e.includes(d.name.toLowerCase())) || props.diet.find(diet => d.name === diet.name)})
        .map(d => <span className='diets' key={d.id}>{d.name}</span>)} */}
    </div>
    <div className='Spoon'>spoonacularScore: {props.score}</div>
    </div>
    <img src={props.img?props.img:foto} className='RecipeImage' alt='recipe' />
    <Link to={`/recipe/${props.id}`}>
      <button onClick={() => props.searchRecipeDetail(props.id)} className='MoreInfo'>More Info</button>
    </Link>
  </div>
)}

function mapStateToProps(state) {
return {
  diets: state.allDiets,
}
}

function mapDispatchToProps(dispatch) {
return {
  searchRecipeDetail: recipe => dispatch(searchRecipeDetail(recipe)),
}
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipe)
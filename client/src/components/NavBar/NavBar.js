import React, { useState } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import { searchRecipes } from '../../redux/Actions';
import { connect } from 'react-redux';

function NavBar(props) {
  const [recipe, setRecipes] = useState('');

  function handleChange(event) {
    setRecipes(event.target.value)
  }
  
  function handleSubmit(e) {
    e.preventDefault()
    // props.allRecipes.filter(e=>e.title.toLowerCase().includes(recipe))
    props.searchRecipes(recipe)
    setRecipes('')
  }
  return (
    <nav className='NavBar'>
      <div className='Links'>
        <Link className='Link Home' to='/home'>Home</Link>
        <Link className='Link Information' to='/information'> The Food App</Link>
        <Link className='Link NewRecipe' to='/addRecipe'>Add Recipe</Link>
        <p id='p'>This is my individual project</p>
      </div>
      <div className='Form'>
        <form
          onSubmit={(e) => { handleSubmit(e) }}>
          <input id='SearchInput' type='text' placeholder='Recipes' value={recipe}
            onChange={(e) => { handleChange(e) }} />
          <input id='SearchSubmitButton' type='submit' value='Search' />
        </form>
      </div>
    </nav>
  )
}

function mapStateToProps(state) {
  return {
    recipes: state.searchedRecipes,
    allRecipes: state.allRecipes
  }
}
function mapDispatchToProps(dispatch) {
  return {
    searchRecipes: (recipe) => dispatch(searchRecipes(recipe)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
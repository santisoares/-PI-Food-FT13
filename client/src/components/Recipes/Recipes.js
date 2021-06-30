import React, { useState, useEffect } from 'react';
import './Recipes.css'
import Recipe from '../Recipe/Recipe';
import FilterBar from '../FilterBar/FilterBar';
import Pages from '../Pages/Pages';
import { searchRecipes, getRecipes, getDiets } from '../../redux/Actions';
import { connect } from 'react-redux';

function Recipes({ location, allRecipes, searchedRecipes, searchRecipes, getRecipes, getDiets }) {

  useEffect(() => {
    getRecipes()
    getDiets();
  }, [getRecipes, getDiets])

  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (location.search !== '') {
      setPage(parseInt(location.search.slice(location.search.indexOf('=') + 1)));
    }
  }, [location.search])

  useEffect(() => {
    if (searchedRecipes.length && searchedRecipes!== 'undefined') {
      setRecipes(searchedRecipes)
    }
    else {
      setRecipes(allRecipes)
    }
  }, [allRecipes, searchedRecipes])

  useEffect(() => {
    return searchRecipes('')
  }, [searchRecipes])

  function handleOrder(param) {
    switch (param) {
      case 'A-Z':
        return setRecipes([...recipes].sort((a, b) => {
          if (a.title > b.title) {
            return 1;
          }
          if (a.title < b.title) {
            return -1;
          }
          return 0;
        }))
      case 'Z-A':
        return setRecipes([...recipes].sort((a, b) => {
          if (b.title > a.title) {
            return 1;
          }
          if (b.title < a.title) {
            return -1;
          }
          return 0;
        }))
      case 'BestScore':
        return setRecipes([...recipes].sort((a, b) => { return b.spoonacularScore - a.spoonacularScore }))
      case 'WorstScore':
        return setRecipes([...recipes].sort((a, b) => { return a.spoonacularScore - b.spoonacularScore }))
      default:
        return setRecipes([...allRecipes])
    }
  }
  function handleFilter(param) {
    if (param !== undefined && param.length){return setRecipes(recipes.filter(r =>r.diet!==undefined? r.diet.includes(param.toLowerCase()): r.diets.includes(param)))
   } else {return setRecipes([...allRecipes])};
  }
    /* {props.diet[0].name?props.diets.filter(d=>props.diet.forEach(e=>e.name.includes(d.name.toLowerCase))):props.diets.filter(d =>  {return props.diet.includes(d.name.toLowerCase())})
        .map(d => <span className='diets' key={d.id}>{d.name}</span>)} */

  return (
    <div>
      <FilterBar filter={handleFilter} order={handleOrder} />
      <div id='Recipes'>
        {recipes.length > 0 ? recipes.slice((page - 1) * 9, page * 9).map(r => <div key={r.id}>
          <Recipe
            id={r.id}
            title={r.title?r.title:r.name}
            img={r.img ? r.img : r.image}
            diet={r.diet!== undefined? r.diet: r.diets}
            score={r.spoonacularScore?r.spoonacularScore:r.score}
          />
        </div>) :
          <div>
            <p id='match'> can't match any recipe </p>
          </div>}
        <Pages allRecipes={recipes} page={page} />
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    allRecipes: state.allRecipes,
    searchedRecipes: state.searchedRecipes,
    // diets: state.allDiets
  }
}

function mapDispatchToProps(dispatch) {
  return {
    searchRecipes: (data) => dispatch(searchRecipes(data)),
    getDiets: () => dispatch(getDiets()),
    getRecipes: () => dispatch(getRecipes())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipes)
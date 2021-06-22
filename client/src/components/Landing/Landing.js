// import React, { useEffect } from 'react';
import './Landing.css';
import { Link } from 'react-router-dom';
import { getRecipes, getDiets } from '../../redux/Actions';
import { connect } from 'react-redux';
import {useEffect} from 'react'

function Landing ({ getRecipes, getDiets }) { 
  useEffect(() => {
    getRecipes()
    getDiets();
  }, [getRecipes, getDiets])
  return (
    <div className='Landing'>
      <div id='info'>
      <h1 id='AppTitle'>The Food App</h1>
      <button id='HomeButton'>
        <Link className='Link' to='/home'>
        HOME
        </Link>
      </button>
      </div>
    </div>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    getDiets: () => dispatch(getDiets()),
    getRecipes: () => dispatch(getRecipes())
  }
}

export default connect(null, mapDispatchToProps)(Landing)
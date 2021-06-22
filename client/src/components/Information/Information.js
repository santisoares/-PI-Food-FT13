import React from 'react';
import './Information.css'

export default function Information() {
  return (
    <div className='AboutContainer'>
      <h3 id='h3'>The Food App</h3>
      <hr/>
      <div className='AboutInfo'>
      <h6 id='h6'>Recipes app created with React, Redux, Express, Sequelize and PostgreSQL.</h6>
      <p>On the homepage you'll have several recipes and can search any recipes by name 
        and it will show some results with basic info of the recipes.</p>
      <p>Every card has a "More Info" button that will show you a new page 
      with the complete information about that specific recipe, 
      in which you can find it's name, diets, summary, health score and score.</p>
      </div>
      <p id='santi'>My name is Santiago Soares Gache and I hope you enjoy my first project with <a target='blank' href="https://www.soyhenry.com">Henry</a></p>
    </div>
  )
}
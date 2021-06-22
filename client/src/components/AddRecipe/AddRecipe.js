import React, { useState } from 'react';
import './AddRecipe.css';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addRecipe, getRecipes } from '../../redux/Actions';

function AddRecipe(props) {
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    title:"",
    summary: '',
    spoonacularScore: 0,
    healthScore: 0,
    instructions: '',
    diets: []
  })

  function handleSubmit(e) {
    e.preventDefault();
    props.addRecipe(form);
    props.getRecipes();
    alert('Recipe Created Successfully');
  }

  const validate = (form) => {
    let errors = {};
    if (!form.title) {
      errors.title = 'title is required'; 
    }
    if (!form.summary) {
      errors.summary = 'Summary is required';
    }
    return errors;
  };

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
    setErrors(validate({
      ...form,
      [e.target.name]: e.target.value
    }));
  }

  return (
    <div className='NewR'>
      { <form className='RecipeForm' onSubmit={(e) => handleSubmit(e)}>
        <div className='NewRecipeForm'>
          <label className='LabelTitle'>title:</label>
          <input type='text' name='title'
            onChange={handleInputChange} />
          {errors.title && (<p className="danger">{errors.title}</p>)}
          <label className='LabelTitle'>spoonacularScore:</label>
          <input type='number' min='0' max='100' name='spoonacularScore'
            onChange={(e) => setForm({ ...form, spoonacularScore: e.target.value })} />
          <label className='LabelTitle'>healthScore:</label>
          <input type='number' min='0' max='100' name='healthScore'
            onChange={(e) => setForm({ ...form, healthScore: e.target.value })} />

          <label className='LabelTitle'>Summary:</label>
          <textarea name='summary'
            onChange={handleInputChange} />
          {errors.summary && (<p className="danger">{errors.summary}</p>)}

          <label className='LabelTitle'>instructions:</label>
          <textarea name='instructions'
            onChange={(e) => setForm({ ...form, instructions: e.target.value })} />
            
          <label className='LabelTitle'>Diets:</label>
          <textarea name='diets'
            onChange={handleInputChange} />
        </div>
        <div className='DietsAndSubmitButton'>
        <label className='LabelTitle'> Diets: </label>
          {props.diets.map(d => <label className='DietsLabel' key={d.id}><input type='checkbox' name={d.name} value={d.name}
            onChange={(e) => setForm({ ...form, diets: [...form.diets, e.target.value] })}
          />{d.name}</label>)}
          {/* <button className='NewRecipeSubmitButton' type='submit'>Submit</button> */}
          {!errors.name && !errors.summary &&
          <button className='NewRecipeSubmitButton' type='submit' >Submit</button>}
        </div>
      </form>}
    </div>
  )
}

function mapStateToProps(state) {
  return {
    diets: state.allDiets,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addRecipe: info => dispatch(addRecipe(info)),
    getRecipes: () => dispatch(getRecipes())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddRecipe)
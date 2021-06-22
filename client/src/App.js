import './App.css';
import Landing from './components/Landing/Landing';
import NavBar from './components/NavBar/NavBar'
import {Route} from 'react-router-dom'
import Recipes from './components/Recipes/Recipes'
import Information from './components/Information/Information'
import RecipeDetails from './components/RecipeDetails/RecipeDetails'
import AddRecipe from './components/AddRecipe/AddRecipe'

function App() {
  const routes = ['/home', '/information', '/recipe/:recipeId', '/addRecipe']
  return (
    <div className="App">
      <Route exact path='/' component={Landing} />
      <Route path={routes} component={NavBar} />
      <Route exact path={routes[0]} component={Recipes} />
      <Route path={routes[1]} component={Information} />
       <Route path={routes[2]} component={RecipeDetails} />
       <Route path={routes[3]} component={AddRecipe} />
    </div>
  );
}

export default App;
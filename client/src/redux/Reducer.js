const initialState = {
    allRecipes: [],
    allDiets: [],
    searchedRecipes: [],
    recipeDetail: {},
    addedRecipe: {},
  }
  
  export default function Reducer(state = initialState, action) {
      switch (action.type) {
            case 'ALL_RECIPES':
            return {
                ...state,
                allRecipes: (action.payload)
            }

            case 'ALL_DIETS':
            return {
                ...state,
                allDiets: (action.payload)
            }

            case 'SEARCH_RECIPES':
            return {
                ...state,
                searchedRecipes: (action.payload)
            }

            case 'SEARCH_RECIPE_DETAIL':
            return {
                ...state,
                recipeDetail: action.payload
            }

            case 'ADD_RECIPE':
            return {
                ...state,
                addedRecipe: action.payload
            }

        default:
        return state;
    };
  };
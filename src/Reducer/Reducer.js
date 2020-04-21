import {
  DELETE_RECIPE,
  SELECT_RECIPE,
  ADD_RECIPE,
  SET_RECIPES,
} from "../Actions/Actions";

const initalStore = {
  recipes: [],
  selectedRecipe: null,
  isFetching: true,
};

const Reducer = (state = initalStore, action) => {
  switch (action.type) {
    case SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload],
        isFetching: false,
      };
    case ADD_RECIPE:
      return {
        ...state,
        recipes: [{ ...action.payload }, ...state.recipes],
      };
    case DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter((recipe) => recipe.id !== action.payload),
      };
    case SELECT_RECIPE:
      return {
        ...state,
        selectedRecipe: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;

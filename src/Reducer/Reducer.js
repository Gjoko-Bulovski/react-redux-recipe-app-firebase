import {
  DELETE_RECIPE,
  SELECT_RECIPE,
  ADD_RECIPE,
  SET_RECIPES,
  REDIRECT,
  ISLOADING,
  SET_RECIPE,
} from "../Actions/Actions";

const initalStore = {
  recipes: [],
  selectedRecipe: null,
  redirect: false,
  isLoading: false,
  recipe: {
    name: "",
    source: "",
    ingredients: [],
    preparationTime: "",
    preparationInstructions: "",
  },
};

const Reducer = (state = initalStore, action) => {
  switch (action.type) {
    case SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload],
        redirect: false,
        recipe: {
          name: "",
          source: "",
          ingredients: [],
          preparationTime: "",
          preparationInstructions: "",
        },
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
    case REDIRECT:
      return {
        ...state,
        redirect: action.payload,
      };
    case ISLOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_RECIPE:
      return {
        ...state,
        recipe: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;

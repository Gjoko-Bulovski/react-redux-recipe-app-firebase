//Fetch recipes and set recipes
export const SET_RECIPES = "SET_RECIPES";
export const setRecipes = (recipes) => {
  return {
    type: SET_RECIPES,
    payload: recipes,
  };
};

export const fetchRecipesAction = () => {
  return (dispatch) => {
    return fetch(`https://recipes-566bf.firebaseio.com/recipes.json`)
      .then((response) => response.json())
      .then((response) => {
        const recipes = response || [];
        dispatch(
          setRecipes(
            Object.keys(recipes).map((key) => ({ ...recipes[key], id: key }))
          )
        );
      })
      .catch((e) => window.alert(e));
  };
};

//add recipe
export const ADD_RECIPE = "ADD_RECIPE";
export const addRecipeNew = (addRecipe) => ({
  type: ADD_RECIPE,
  payload: addRecipe,
});

export const addRecipeAction = (addRecipe) => {
  return (dispatch) => {
    return fetch(`https://recipes-566bf.firebaseio.com/recipes.json`, {
      method: "post",
      body: JSON.stringify(addRecipe),
    })
      .then((response) => response.json())
      .then((response) =>
        dispatch(addRecipeNew({ ...addRecipe, id: response.name }))
      )
      .catch((e) => window.alert(e));
  };
};

//select recipe
export const SELECT_RECIPE = "SELECT_RECIPE";
export const selectRecipeAction = (id) => ({
  type: SELECT_RECIPE,
  payload: id,
});

//delete recipe
export const DELETE_RECIPE = "DELETE_RECIPE";
export const deleteRecipe = (id) => ({
  type: DELETE_RECIPE,
  payload: id,
});

export const deleteRecipeAction = (id) => {
  return (dispatch) => {
    return fetch(`https://recipes-566bf.firebaseio.com/recipes/${id}.json`, {
      method: "delete",
    })
      .then((response) => response.json())
      .then(dispatch(deleteRecipe(id)))
      .catch((e) => window.alert(e));
  };
};

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
    dispatch(isLoadingAction(true));
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
      .then(() => dispatch(isLoadingAction(false)))
      .catch((e) => {
        dispatch(isLoadingAction(false));
        console.log(e);
      });
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
      .then(() => dispatch(redirectToRecipeList(true)))
      .catch((e) => {
        dispatch(isLoadingAction(false));
        console.log(e);
      });
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
    dispatch(isLoadingAction(true));
    return fetch(`https://recipes-566bf.firebaseio.com/recipes/${id}.json`, {
      method: "delete",
    })
      .then((response) => response.json())
      .then(() => dispatch(deleteRecipe(id)))
      .then(() => dispatch(isLoadingAction(false)))
      .then(() => dispatch(redirectToRecipeList(true)))
      .catch((e) => {
        dispatch(isLoadingAction(false));
        console.log(e);
      });
  };
};

//redirect
export const REDIRECT = "REDIRECT";
export const redirectToRecipeList = (redirect) => ({
  type: REDIRECT,
  payload: redirect,
});

//isLoading
export const ISLOADING = "ISLOADING";
export const isLoadingAction = (isLoading) => ({
  type: ISLOADING,
  payload: isLoading,
});

//Fetch recipe and set recipe
export const SET_RECIPE = "SET_RECIPE";
export const setRecipe = (recipe) => {
  return {
    type: SET_RECIPE,
    payload: recipe,
  };
};

export const fetchRecipeAction = (id) => {
  return (dispatch) => {
    dispatch(isLoadingAction(true));
    return fetch(`https://recipes-566bf.firebaseio.com/recipes/${id}.json`)
      .then((response) => response.json())
      .then((response) => {
        const recipe = response;
        dispatch(setRecipe(recipe));
      })
      .then(() => dispatch(isLoadingAction(false)))
      .catch((e) => {
        dispatch(isLoadingAction(false));
        console.log(e);
      });
  };
};

//edit recipe
export const editRecipeAction = (id, editRecipe) => {
  return (dispatch) => {
    dispatch(isLoadingAction(true));
    return fetch(`https://recipes-566bf.firebaseio.com/recipes/${id}.json`, {
      method: "put",
      body: JSON.stringify(editRecipe),
    })
      .then((response) => response.json())
      .then(() => dispatch(redirectToRecipeList(true)))
      .then(() => dispatch(isLoadingAction(false)))
      .catch((e) => {
        dispatch(isLoadingAction(false));
        console.log(e);
      });
  };
};

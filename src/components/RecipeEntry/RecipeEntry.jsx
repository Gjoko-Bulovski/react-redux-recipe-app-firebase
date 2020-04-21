import React, { useState } from "react";
import { connect } from "react-redux";
import { addRecipeAction } from "../../Actions/Actions";
import { Redirect } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "../RecipeEntry/RecipeEntry.css";
import Ingredient from "../Ingredient/Ingredient";
import Error from "../UI/Error/Error";

const RecipeEntry = ({ addNewRecipe }) => {
  const emptyIngredient = () => ({
    id: uuidv4(),
    text: "",
    weight: "",
  });

  const [addRecipe, setAddRecipe] = useState({
    name: "",
    source: "",
    preparationTime: "",
    preparationInstructions: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  // ingredients form
  const [textBlured, setTextBlured] = useState(false);
  const [weightBlured, setWeightBlured] = useState(false);
  const [addIngredient, setAddIngredient] = useState(emptyIngredient());
  const [ingredients, setIngredients] = useState([]);
  const [ingredientsFormSubmitted, setIngredientsFormSubmitted] = useState(
    false
  );

  // recipe form
  const [recipeNameBlured, setRecipeNameBlured] = useState(false);
  const [recipeSourceBlured, setRecipeSourceBlured] = useState(false);
  const [
    recipePreparationTimeBlured,
    setRecipePreparationTimeBlured,
  ] = useState(false);
  const [
    recipePreparationInstructions,
    setRecipePreparationInstructions,
  ] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddRecipe((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (hasOneIngredient() && isRecipeNameValid()) {
      setFormSuccess(true);
      addNewRecipe({ ...addRecipe, ingredients: ingredients });
    } else {
      setFormSuccess(false);
    }
    setRecipeSourceBlured(false);
    setRecipePreparationTimeBlured(false);
    setRecipePreparationInstructions(false);
  };

  const handleChangeIngredients = (e) => {
    const { name, value } = e.target;
    setAddIngredient((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitIngredients = (e) => {
    e.preventDefault();
    if (isIngredientTextValid() && isIngredientWeightValid()) {
      setIngredients([...ingredients, addIngredient]);
      // reset form state
      setAddIngredient(emptyIngredient);
      setTextBlured(false);
      setWeightBlured(false);
      setIngredientsFormSubmitted(false);
    } else {
      setIngredientsFormSubmitted(true);
    }
  };

  //valid
  const isIngredientTextValid = () => {
    return addIngredient.text && addIngredient.text.length > 0;
  };

  const isIngredientWeightValid = () => {
    return addIngredient.weight && addIngredient.weight.length > 0;
  };

  const hasOneIngredient = () => {
    return ingredients.length > 0;
  };

  const isRecipeNameValid = () => {
    return addRecipe.name && addRecipe.name.length > 0;
  };

  const isRecipeSourceValid = () => {
    return addRecipe.source && addRecipe.source.length > 0;
  };

  const isRecipePreparationTimeBluredValid = () => {
    return addRecipe.preparationTime && addRecipe.preparationTime.length >= 2;
  };

  const isRecipePreparationInstructionsValid = () => {
    return (
      addRecipe.preparationInstructions &&
      addRecipe.preparationInstructions.length > 10
    );
  };

  if (formSuccess) {
    return <Redirect to="/recipe-list" />;
  }

  return (
    <>
      <h2>Add New Recipe</h2>
      <div className="containerRecipe">
        <div className="formContainer">
          <div>
            <form className="form" onSubmit={handleSubmitIngredients}>
              <div className="inputGroup">
                <label htmlFor="ingredients">Ingredients text</label>
                <input
                  type="text"
                  name="text"
                  value={addIngredient.text}
                  placeholder="Ingredients text"
                  onChange={handleChangeIngredients}
                  onBlur={() => setTextBlured(true)}
                />
                {((formSubmitted && !hasOneIngredient()) ||
                  ingredientsFormSubmitted ||
                  textBlured) &&
                  !isIngredientTextValid() && <Error />}
              </div>
              <div className="inputGroup">
                <label htmlFor="ingredients">Ingredients weight</label>
                <input
                  type="text"
                  name="weight"
                  value={addIngredient.weight}
                  placeholder="Ingredients weight"
                  onChange={handleChangeIngredients}
                  onBlur={() => setWeightBlured(true)}
                />
                {((formSubmitted && !hasOneIngredient()) ||
                  ingredientsFormSubmitted ||
                  weightBlured) &&
                  !isIngredientWeightValid() && <Error />}
              </div>
              <button type="submit" title="Add new ingredient">
                <i className="fas fa-plus-circle fa-2x"></i>
              </button>
              {ingredients.length !== 0 ? (
                <ul className="ingredientsList">
                  {ingredients.map((ingredient) => {
                    return (
                      <Ingredient
                        key={ingredient.id}
                        id={ingredient.id}
                        text={ingredient.text}
                        weight={ingredient.weight}
                      />
                    );
                  })}
                </ul>
              ) : (
                "Add new ingredient"
              )}
              {formSubmitted && !hasOneIngredient() && (
                <Error title="Add at least one" />
              )}
            </form>
          </div>
          <form className="form" onSubmit={handleSubmit}>
            <div className="inputGroup">
              <label htmlFor="name">Recipe name</label>
              <input
                type="text"
                name="name"
                value={addRecipe.name}
                placeholder="Recipe name"
                onChange={handleChange}
                onBlur={() => setRecipeNameBlured(true)}
              />
              {(formSubmitted || recipeNameBlured) && !isRecipeNameValid() && (
                <Error />
              )}
            </div>
            <div className="inputGroup">
              <label htmlFor="source">Source</label>
              <input
                type="text"
                name="source"
                placeholder="Source"
                value={addRecipe.source}
                onChange={handleChange}
                onBlur={() => setRecipeSourceBlured(true)}
              />
              {recipeSourceBlured && !isRecipeSourceValid() && <Error />}
            </div>
            <div className="inputGroup">
              <label htmlFor="preparationTime">Preparation time</label>
              <input
                type="text"
                name="preparationTime"
                value={addRecipe.preparationTime}
                placeholder="Preparation time (h or min)"
                onChange={handleChange}
                onBlur={() => setRecipePreparationTimeBlured(true)}
              />
              {recipePreparationTimeBlured &&
                !isRecipePreparationTimeBluredValid() && (
                  <Error title="Please enter (hours or minutes) minimum of 2 characters" />
                )}
            </div>
            <div className="inputGroup">
              <label htmlFor="name">Preparation instructions</label>
              <textarea
                rows="3"
                type="text"
                name="preparationInstructions"
                placeholder="Preparation instructions"
                value={addRecipe.preparationInstructions}
                onChange={handleChange}
                onBlur={() => setRecipePreparationInstructions(true)}
              />
              {recipePreparationInstructions &&
                !isRecipePreparationInstructionsValid() && (
                  <Error title="Please type minimum of 10 characters" />
                )}
            </div>
            <button className="buttonSubmit" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNewRecipe: (addRecipe) => {
      dispatch(addRecipeAction(addRecipe));
    },
  };
};

export default connect(null, mapDispatchToProps)(RecipeEntry);

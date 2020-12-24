import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { editRecipeAction, isLoadingAction } from "../../Actions/Actions";
import { Redirect, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "../RecipeEntry/RecipeEntry.css";
import Error from "../UI/Error/Error";
import { Spinner } from "../UI/Spinner/Spinner";

const EditRecipe = ({
  match,
  isLoadingAction,
  isLoading,
  editRecipeAction,
  redirect,
}) => {
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
  const [ingredients, setIngredients] = useState([]);
  const [ingredientsFormSubmitted, setIngredientsFormSubmitted] = useState(
    false
  );
  const [addIngredient, setAddIngredient] = useState(emptyIngredient());

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

  //useEffect
  useEffect(() => {
    const fetchRecipe = async () => {
      isLoadingAction(true);
      const result = await fetch(
        `https://recipes-566bf.firebaseio.com/recipes/${match.params.id}.json`
      );
      const response = await result.json();
      setIngredients(response.ingredients);
      setAddRecipe({
        name: response.name,
        source: response.source,
        preparationTime: response.preparationTime,
        preparationInstructions: response.preparationInstructions,
      });
      isLoadingAction(false);
    };
    fetchRecipe();
  }, []);

  //handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddRecipe((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (
      hasOneIngredient() &&
      isRecipeNameValid() &&
      foundIngredientTextIsEmpty === undefined &&
      foundIngredientWeightIsEmpty === undefined
    ) {
      setFormSuccess(true);
      editRecipeAction(match.params.id, {
        ...addRecipe,
        ingredients: ingredients,
      });
    } else {
      setFormSuccess(false);
    }
    setRecipeSourceBlured(false);
    setRecipePreparationTimeBlured(false);
    setRecipePreparationInstructions(false);
  };

  //updateText
  const updateText = (ingId, ingText) => {
    setIngredients(
      ingredients.map((ing) => {
        if (ing.id === ingId) {
          return { ...ing, text: ingText };
        } else {
          return ing;
        }
      })
    );
  };

  //updateWeight
  const updateWeight = (ingId, ingWeight) => {
    setIngredients(
      ingredients.map((ing) => {
        if (ing.id === ingId) {
          return { ...ing, weight: ingWeight };
        } else {
          return ing;
        }
      })
    );
  };

  //deleteIngredient
  const deleteIngredient = (id) => {
    let updatedIngredients = ingredients.filter((email) => email.id !== id);
    setIngredients(updatedIngredients);
  };

  //handleChangeIngredients
  const handleChangeIngredients = (e) => {
    const { name, value } = e.target;
    setAddIngredient((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //handleSubmitIngredients
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

  //ingredient Text And Weight Is Empty
  const ingredientTextIsEmpty = () => {
    return ingredients.map((i) => {
      return i.text.length === 0;
    });
  };
  const foundIngredientTextIsEmpty = ingredientTextIsEmpty().find(
    (element) => element === true
  );

  const ingredientWeightIsEmpty = () => {
    return ingredients.map((i) => {
      return i.weight.length === 0;
    });
  };
  const foundIngredientWeightIsEmpty = ingredientWeightIsEmpty().find(
    (element) => element === true
  );

  //redirect
  if (formSuccess && redirect) {
    return <Redirect to="/" />;
  }

  return (
    <>
      {isLoading && <Spinner />}
      <h2>Edit Recipe</h2>
      <div className="iconWrapper">
        <Link to="/">
          <i title="Back to recipes" className="fas fa-chevron-left fa-2x"></i>
        </Link>
      </div>
      <div className="containerRecipe">
        <div className="formContainer">
          <div>
            <form className="form" onSubmit={handleSubmitIngredients}>
              <div>
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
              </div>
              <strong style={{ textAlign: "left", fontWeight: 600 }}>
                {ingredients.length !== 0
                  ? "Ingredients:"
                  : "Add new ingredient"}
              </strong>
              {foundIngredientTextIsEmpty && (
                <Error title="Text is empty,Please fill out this field or Delete this ingredient" />
              )}
              {foundIngredientWeightIsEmpty && (
                <Error title="Weight is empty,Please fill out this field or Delete this ingredient" />
              )}
              <ul className="ingredientsList">
                {ingredients.map((i) => {
                  return (
                    <li key={i.id} className="ingredientContainer">
                      <div>
                        <strong>ID:</strong> {i.id.slice(0, 3)}
                      </div>
                      <div className="inputGroup">
                        <label htmlFor="ingredients">Text</label>
                        <input
                          type="text"
                          name="editText"
                          value={i.text}
                          onChange={(e) => updateText(i.id, e.target.value)}
                        />
                        <label htmlFor="ingredients">Weight</label>
                        <input
                          type="text"
                          name="editWeight"
                          value={i.weight}
                          onChange={(e) => updateWeight(i.id, e.target.value)}
                        />
                        <button
                          onClick={() => deleteIngredient(i.id)}
                          className="ingredient_delete"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
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
                rows="6"
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

const mapStateToProps = (state) => {
  return {
    recipe: state.recipe,
    isLoading: state.isLoading,
    redirect: state.redirect,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editRecipeAction: (id, editRecipe) => {
      dispatch(editRecipeAction(id, editRecipe));
    },
    isLoadingAction: (isLoading) => {
      dispatch(isLoadingAction(isLoading));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditRecipe);

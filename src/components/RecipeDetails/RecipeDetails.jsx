import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ModalDelete from "../ModalDelete/ModalDelete";
import "../RecipeDetails/RecipeDetails.css";
import Ingredient from "../Ingredient/Ingredient";

const RecipeDetails = ({ recipes, selectedRecipe }) => {
  let updatedSelectedRecipe = recipes.find(
    (recipe) => recipe.id === selectedRecipe
  );

  if (updatedSelectedRecipe == null)
    return (
      <div className="detailsEmpty">
        <p>Recipe details are empty</p>
        <Link to="/recipe-list" className="link">
          <i
            title="Back to recipe list"
            className="fas fa-chevron-left fa-2x"
          ></i>
          <p>Back to recipe list</p>
        </Link>
      </div>
    );

  return (
    <>
      <h2>Recipe Details</h2>
      <div className="iconWrapper">
        <Link to="/recipe-list">
          <i
            title="Back to recipe list"
            className="fas fa-chevron-left fa-2x"
          ></i>
        </Link>
      </div>
      <div className="containerRecipeDetails">
        <div className="contentRecipeDetails">
          <div className="innerGroupRecipeDetails">
            <strong>Recipe Name: </strong>
            {updatedSelectedRecipe.name}
          </div>
          <div className="innerGroupRecipeDetails">
            <strong>Recipe Source: </strong>
            {updatedSelectedRecipe.source.length !== 0
              ? updatedSelectedRecipe.source
              : "/"}
          </div>
          <div className="innerGroupRecipeDetails">
            <strong>Ingredients: </strong>
            <ul>
              {updatedSelectedRecipe.ingredients.map((ingredient) => {
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
          </div>
          <div className="innerGroupRecipeDetails">
            <strong>Preparation Time: </strong>
            {updatedSelectedRecipe.preparationTime.length !== 0
              ? updatedSelectedRecipe.preparationTime
              : "/"}
          </div>
          <ModalDelete
            id={updatedSelectedRecipe.id}
            name={updatedSelectedRecipe.name}
          />
        </div>
        <div>
          <div className="innerGroupRecipeDetails">
            <strong>Preparation Instructions: </strong>
            {updatedSelectedRecipe.preparationInstructions.length !== 0
              ? updatedSelectedRecipe.preparationInstructions
              : "/"}
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes,
    selectedRecipe: state.selectedRecipe,
  };
};

export default connect(mapStateToProps)(RecipeDetails);

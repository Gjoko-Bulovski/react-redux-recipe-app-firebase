import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import ModalDelete from "../ModalDelete/ModalDelete";
import "../RecipeDetails/RecipeDetails.css";
import Ingredient from "../Ingredient/Ingredient";
import { Spinner } from "../UI/Spinner/Spinner";
import { fetchRecipeAction, selectRecipeAction } from "../../Actions/Actions";

const RecipeDetails = ({
  match,
  redirect,
  isLoading,
  fetchRecipeAction,
  recipe,
  selectRecipeAction,
}) => {
  //useEffect
  useEffect(() => {
    fetchRecipeAction(match.params.id);
  }, []);

  //Recipe is null
  if (recipe == null) {
    return (
      <div className="detailsEmpty">
        <p>Recipe details are empty</p>
        <Link to="/" className="link">
          <i
            title="Back to recipe list"
            className="fas fa-chevron-left fa-2x"
          ></i>
          <p>Back to recipe list</p>
        </Link>
      </div>
    );
  }

  return (
    <>
      {redirect && <Redirect to="/" />}
      {isLoading && <Spinner />}
      <h2>Recipe Details</h2>
      <div className="iconWrapper">
        <Link to="/">
          <i title="Back to recipes" className="fas fa-chevron-left fa-2x"></i>
        </Link>
      </div>
      <div className="containerRecipeDetails">
        <div className="contentRecipeDetails">
          <div className="innerGroupRecipeDetails">
            <strong>Recipe Name: </strong>
            {recipe.name}
          </div>
          <div className="innerGroupRecipeDetails">
            <strong>Recipe Source: </strong>
            {recipe.source.length !== 0 ? recipe.source : "/"}
          </div>
          <div className="innerGroupRecipeDetails">
            <strong>Ingredients: </strong>
            <ul>
              {recipe.ingredients.map((ingredient) => {
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
            {recipe.preparationTime.length !== 0 ? recipe.preparationTime : "/"}
          </div>
        </div>
        <div>
          <div className="innerGroupRecipeDetails">
            <strong className="innerGroupRecipeDetails_title">
              Preparation Instructions:{" "}
            </strong>
            {recipe.preparationInstructions.length !== 0
              ? recipe.preparationInstructions
              : "/"}
          </div>
        </div>
        <Link to={`/recipes/edit/${match.params.id}`}>
          <button
            className="btnEdit"
            onClick={() => selectRecipeAction(match.params.id)}
          >
            Edit
          </button>
        </Link>

        <ModalDelete id={match.params.id} name={recipe.name} />
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRecipeAction: (id) => {
      dispatch(fetchRecipeAction(id));
    },
    selectRecipeAction: (id) => {
      dispatch(selectRecipeAction(id));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    redirect: state.redirect,
    isLoading: state.isLoading,
    recipe: state.recipe,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetails);

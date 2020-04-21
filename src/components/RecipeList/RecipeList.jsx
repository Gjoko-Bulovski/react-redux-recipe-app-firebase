import React, { useEffect } from "react";
import { connect } from "react-redux";
import "../RecipeList/RecipeList.css";
import { Link } from "react-router-dom";
import Recipe from "../Recipe/Recipe";
import { fetchRecipesAction } from "../../Actions/Actions";
import { Spinner } from "../UI/Spinner/Spinner";

const RecipeList = ({ recipes, fetchRecipes, isFetching }) => {
  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <>
      {isFetching && <Spinner />}
      <h2>Recipe List</h2>
      <div className="iconWrapperRecipeList">
        <Link to="/">
          <i
            title="Add new ingredient"
            className="fas fa-plus-circle fa-2x"
          ></i>
        </Link>
      </div>
      <div className="containerRecipeList">
        <div className="tableWrapper">
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Source</th>
                <th>Ingredients</th>
                <th>Preparation Time</th>
                <th>Preparation Instructions</th>
              </tr>
            </thead>
            <tbody>
              {recipes.map((recipe) => {
                return <Recipe key={recipe.id} {...recipe} />;
              })}
            </tbody>
          </table>
          {recipes.length === 0 && (
            <>
              <p>The recipe list is empty.Please add a new recipe.</p>
              <Link to="/">
                <i
                  title="Add new ingredient"
                  className="fas fa-plus-circle fa-2x"
                ></i>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes,
    isFetching: state.isFetching,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRecipes: () => {
      dispatch(fetchRecipesAction());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList);

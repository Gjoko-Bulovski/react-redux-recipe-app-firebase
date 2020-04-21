import React from "react";
import "../Recipe/Recipe.css";
import { connect } from "react-redux";
import { selectRecipeAction } from "../../Actions/Actions";
import { Link } from "react-router-dom";
import ModalDelete from "../ModalDelete/ModalDelete";

const Recipe = ({
  selectedRecipe,
  id,
  name,
  source,
  ingredients,
  preparationTime,
  preparationInstructions,
}) => {
  let ingredient = ingredients.map((ingredient) => {
    return (
      <span key={ingredient.id}>
        {` ${ingredient.text} ${ingredient.weight}`}
      </span>
    );
  });

  return (
    <>
      <tr className="tbody-tr">
        <td>{id.slice(0, 3)}</td>
        <td>{name}</td>
        <td>{source.length !== 0 ? source : "/"}</td>
        <td>
          <div className="ellipsis">{ingredient}</div>
        </td>
        <td>{preparationTime.length !== 0 ? preparationTime : "/"}</td>
        <td>
          <div className="ellipsis" title={preparationInstructions}>
            {preparationInstructions.length !== 0
              ? preparationInstructions
              : "/"}
          </div>
        </td>
        <td>
          <Link to="/recipe-details">
            <button className="btnView" onClick={() => selectedRecipe(id)}>
              View Details
            </button>
          </Link>
        </td>
        <td>
          <ModalDelete id={id} name={name} />
        </td>
      </tr>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectedRecipe: (id) => dispatch(selectRecipeAction(id)),
  };
};

export default connect(null, mapDispatchToProps)(Recipe);

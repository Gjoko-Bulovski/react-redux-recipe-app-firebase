import React from "react";
import "./Ingredient.css";

const Ingredient = ({ id, text, weight, deleteIngredient, btnDelete }) => {
  return (
    <li className="ingredientContainer">
      <div>
        <strong>ID:</strong> {id.slice(0, 3)}
      </div>
      <div>
        <strong>Text:</strong> {text}
      </div>
      <div>
        <strong>Weight:</strong> {weight}
      </div>
      {btnDelete && (
        <button
          onClick={() => deleteIngredient(id)}
          className="ingredient_delete"
        >
          Delete
        </button>
      )}
    </li>
  );
};

export default Ingredient;

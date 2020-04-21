import React from "react";
import "./Ingredient.css";

const Ingredient = ({ id, text, weight }) => {
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
    </li>
  );
};

export default Ingredient;

import { Ingredient } from "../../interfaces";
import { Badge } from "../badge/Badge";
import { FormIngredient } from "../formIngredient/FormIngredient";
import "./styles.css";

interface Props {
  ingredients: Ingredient[];
}

export function Ingredients({ ingredients }: Props) {
  console.log(ingredients);

  return (
    <div className="ingredients-container">
      <div className="ingredients-list">
        <h2>Ingredients List</h2>
        <div className="ingredients">
          {ingredients.map((item: Ingredient) => (
            <Badge {...item} key={item.id} />
          ))}
        </div>
      </div>

      <div className="ingredients-form">
        <div className="ingredient-form">
          <h2>Ingredient Form</h2>
          <FormIngredient />
        </div>
      </div>
    </div>
  );
}

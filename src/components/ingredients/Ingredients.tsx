import { useState } from "react";
import { WeakIngredient, Ingredient } from "../../interfaces";
import { Badge } from "../badge/Badge";
import { FormIngredient } from "../formIngredient/FormIngredient";
import { isEmpty } from "../../utilities";
import "./styles.css";

interface Props {
  ingredients: Ingredient[];
  addIngredient: (item: WeakIngredient) => void;
  removeIngredient: (id: string) => void;
  editIngredient: (item: Ingredient) => void;
}

export function Ingredients({
  ingredients,
  addIngredient,
  removeIngredient,
  editIngredient,
}: Props) {
  const [currentIngredient, setCurrentIngredient] = useState<Ingredient>(
    {} as Ingredient
  );

  return (
    <div className="ingredients-container">
      <div>
        <div className="ingredients-list">
          <h2>Ingredients List</h2>
          <div className="ingredients">
            {ingredients.map((item: Ingredient) => (
              <Badge
                {...item}
                key={item.id}
                removeIngredient={removeIngredient}
                setCurrentIngredient={setCurrentIngredient}
              />
            ))}
          </div>
        </div>
      </div>
      {!isEmpty(currentIngredient) ? (
        <FormIngredient
          addIngredient={addIngredient}
          title="Edit Ingredient Form"
          editIngredient={editIngredient}
          name_={currentIngredient.name}
          quantity_={String(currentIngredient.quantity)}
          description_={currentIngredient.description}
          currentIngredient={currentIngredient}
          setCurrentIngredient={setCurrentIngredient}
        />
      ) : (
        <FormIngredient
          title="Add Ingredient Form"
          addIngredient={addIngredient}
          editIngredient={editIngredient}
          currentIngredient={currentIngredient}
          setCurrentIngredient={setCurrentIngredient}
        />
      )}
    </div>
  );
}

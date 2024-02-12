import { useState, useEffect, Dispatch } from "react";
import { Ingredient, WeakIngredient } from "../../interfaces";
import { isEmpty } from "../../utilities";
import "./styles.css";

interface Props {
  addIngredient: (item: WeakIngredient) => void;
  editIngredient: (item: Ingredient) => void;
  name_?: string;
  quantity_?: string;
  description_?: string;
  currentIngredient: Ingredient;
  setCurrentIngredient: Dispatch<Ingredient>;
}

export function FormIngredient({
  addIngredient,
  editIngredient,
  setCurrentIngredient,
  name_ = "",
  quantity_ = "",
  description_ = "",
  currentIngredient,
}: Props) {
  const [name, setName] = useState(name_);
  const [quantity, setQuantity] = useState(quantity_);
  const [description, setDescription] = useState(description_);

  useEffect(() => {
    setName(name_);
    setQuantity(quantity_);
    setDescription(description_);
  }, [name_, quantity_, description_]);

  const handleQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = e.target.value.replace(/\D/g, "");
    setQuantity(result);
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isEmpty(currentIngredient))
      addIngredient({ name, quantity: parseInt(quantity), description });
    else {
      editIngredient({
        id: currentIngredient.id,
        name,
        quantity: parseInt(quantity),
        description,
      });
      setCurrentIngredient({} as Ingredient);
    }
    setName("");
    setQuantity("");
    setDescription("");
  }

  return (
    <form className="form-group" onSubmit={handleSubmit}>
      <div className="form-control">
        <label htmlFor="name">Name*</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Name of ingredient"
          required
          minLength={3}
          maxLength={15}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label htmlFor="quantity">Quantity* (grams)</label>
        <input
          type="text"
          name="quantity"
          id="quantity"
          placeholder="Quantity (grams)"
          value={String(quantity)}
          onChange={handleQuantity}
          required
        />
      </div>
      <div className="form-control">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          placeholder="A couple of words..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit">
        {isEmpty(currentIngredient) ? "Add Ingredient" : "Update Ingredient"}
      </button>
    </form>
  );
}

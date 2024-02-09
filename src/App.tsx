import { useState, useEffect } from "react";
import {
  fetchIngredients,
  fetchBurgers,
  createIngredient,
  deleteIngredient,
} from "./api/fetchApis";
import { Burger, Ingredient, WeakIngredient } from "./interfaces";
import { Header } from "./components/header/Header";
import { Ingredients } from "./components/ingredients/Ingredients";
import { Burgers } from "./components/burgers/Burgers";
import { Orders } from "./components/orders/Orders";
import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [burgers, setBurgers] = useState<Burger[]>([]);

  async function addIngredient(item: WeakIngredient) {
    try {
      const newIngredient = await createIngredient(item);
      setIngredients((prev) => [...prev, newIngredient]);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  async function removeIngredient(id: string) {
    try {
      await deleteIngredient(id);
      const newIngredients = ingredients.filter((item) => item.id !== id);
      setIngredients(newIngredients);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  useEffect(() => {
    let active = true;
    const fetchData = async () => {
      const _ingredients: Ingredient[] = await fetchIngredients();
      if (active) setIngredients(_ingredients);
    };

    try {
      fetchData();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
    return () => {
      active = false;
      console.log("Ignoring fetchIngredients");
    };
  }, []);

  useEffect(() => {
    let active = true;
    const fetchData = async () => {
      const _burgers: Burger[] = await fetchBurgers();
      if (active) setBurgers(_burgers);
    };

    try {
      fetchData();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }

    return () => {
      active = false;
      console.log("Ignoring fetchBurgers");
    };
  }, []);

  return (
    <div className="app">
      <Header />
      <div className="main">
        <Routes>
          <Route path="/" element={<Burgers burgers={burgers} />} />
          <Route
            path="/ingredients"
            element={
              <Ingredients
                ingredients={ingredients}
                addIngredient={addIngredient}
                removeIngredient={removeIngredient}
              />
            }
          />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

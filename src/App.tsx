import { useState, useEffect } from "react";
import {
  getIngredients,
  getBurgers,
  createIngredient,
  deleteIngredient,
  updateIngredient,
} from "./api/fetchApis";
import { Burger, Ingredient, WeakIngredient } from "./interfaces";
import { Header } from "./components/header/Header";
import { Ingredients } from "./components/ingredients/Ingredients";
import { Burgers } from "./components/burgers/Burgers";
import { Orders } from "./components/orders/Orders";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

function App() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [burgers, setBurgers] = useState<Burger[]>([]);

  async function addIngredient(item: WeakIngredient) {
    try {
      const newIngredient = await createIngredient(item);
      const newIngredients = [...ingredients, newIngredient];
      newIngredients.sort((a, b) => a.name.localeCompare(b.name));
      setIngredients(newIngredients);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Axios Error: Add Ingredient", error.message);
      }
    }
  }

  async function removeIngredient(id: string) {
    try {
      await deleteIngredient(id);
      const newIngredients = ingredients.filter((item) => item.id !== id);
      setIngredients(newIngredients);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Axios Error: Remove Ingredient", error.message);
      }
    }
  }

  async function editIngredient(item: Ingredient) {
    try {
      const updatedIngredient = await updateIngredient(item);
      const newIngredients = [
        ...ingredients.filter((elem) => elem.id !== item.id),
        updatedIngredient,
      ];
      newIngredients.sort((a, b) => a.name.localeCompare(b.name));
      setIngredients(newIngredients);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Axios Error: Edit Ingredient", error.message);
      }
    }
  }

  useEffect(() => {
    let active = true;
    const fetchIngredients = async () => {
      try {
        const _ingredients: Ingredient[] = await getIngredients();
        if (active) {
          _ingredients.sort((a, b) => a.name.localeCompare(b.name));
          setIngredients(_ingredients);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("Axios Error: Get Ingredients", error.message);
        }
      }
    };

    fetchIngredients();

    return () => {
      active = false;
      console.log("Ignoring Get Ingredients");
    };
  }, []);

  useEffect(() => {
    let active = true;
    const fetchBurgers = async () => {
      try {
        const _burgers: Burger[] = await getBurgers();
        if (active) setBurgers(_burgers);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("Axios Error: GetBurgers", error.message);
        }
      }
    };

    fetchBurgers();

    return () => {
      active = false;
      console.log("Ignoring Get Burgers");
    };
  }, []);

  return (
    <AppContainer>
      <Header />
      <Routes>
        <Route path="/" element={<Burgers burgers={burgers} />} />
        <Route
          path="/ingredients"
          element={
            <Ingredients
              ingredients={ingredients}
              addIngredient={addIngredient}
              removeIngredient={removeIngredient}
              editIngredient={editIngredient}
            />
          }
        />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  padding: 1.5rem;
`;

export default App;

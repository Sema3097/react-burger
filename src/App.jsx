import React, { useEffect, useState } from "react";
import "./App.css";
import { ApiIngredients } from "./utils/data";
import { AppHeader } from "./components/app-header/app-header";
import { BurgerIngredients } from "./components/burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "./components/burger-constructor/burger-constructor";
import { Modal } from "./components/uikit/modal";

function App() {
  const [ingredientsData, setIngredientsData] = useState([]);

  useEffect(() => {
    fetch(ApiIngredients)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setIngredientsData(data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="App">
      <AppHeader />
      <main className="App-container">
        <BurgerIngredients ingredientsData={ingredientsData} />
        <BurgerConstructor ingredientsData={ingredientsData} />
      </main>
    </div>
  );
}

export default App;

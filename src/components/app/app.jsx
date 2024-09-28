import React, { useEffect, useState } from "react";
import { ApiIngredients } from "../../utils/data";
import { AppHeader } from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import styles from './app.module.css'

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
    <div className={styles.App}>
      <AppHeader />
      <main className={styles.App_container}>
        <BurgerIngredients ingredientsData={ingredientsData} />
        <BurgerConstructor ingredientsData={ingredientsData} />
      </main>
    </div>
  );
}

export default App;

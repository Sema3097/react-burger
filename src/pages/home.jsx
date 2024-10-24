import React from "react";
import { BurgerIngredients } from "../components/burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../components/burger-constructor/burger-constructor";
import styles from "./app.module.css";

function HomePage({ ingredients }) {
  return (
    <div className={styles.App}>
      <main className={styles.App_container}>
        <BurgerIngredients ingredients={ingredients} />
        <BurgerConstructor />
      </main>
    </div>
  );
}

export default HomePage;

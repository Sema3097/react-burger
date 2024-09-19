import { React, useState } from "react";
import {
  Tab,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredient.module.css";
import { BurgerIngredientBun } from "./burger-ingredient-bun";
import { BurgerIngredientSauce } from "./burger-ingredient-sauce";
import { BurgerIngredientMain } from "./burger-ingredient-main";

const BurgerIngredients = ({ data }) => {
  const [current, setCurrent] = useState("one");

  return (
    <section className={styles.section}>
      <h1 className="text text_type_main-large" style={{ padding: "20 0px" }}>
        Соберите бургер
      </h1>
      <div className={styles.tab}>
        <Tab value="one" active={current === "one"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === "two"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === "three"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <section>
        <BurgerIngredientBun data={data} />
        <BurgerIngredientSauce data={data} />
        <BurgerIngredientMain data={data} />
      </section>
    </section>
  );
};

export { BurgerIngredients };

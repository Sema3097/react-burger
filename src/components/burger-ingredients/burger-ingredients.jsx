import { React, useState } from "react";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredient.module.css";
import { BurgerIngredientBun } from "./burger-ingredient-bun";
import { BurgerIngredientSauce } from "./burger-ingredient-sauce";
import { BurgerIngredientMain } from "./burger-ingredient-main";

const BurgerIngredients = ({ data }) => {
  const [current, setCurrent] = useState("one");

  return (
    <section className={styles.section_burgers}>
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
      <section className={styles.burger_menu}>
        <BurgerIngredientBun data={data} />
        <BurgerIngredientSauce data={data} />
        <BurgerIngredientMain data={data} />
      </section>
    </section>
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number,
  }),
};

export { BurgerIngredients };

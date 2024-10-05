import { React, useState, useRef, useEffect } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredient.module.css";
import { BurgerIngredientBun } from "./burger-ingredient-bun";
import { BurgerIngredientSauce } from "./burger-ingredient-sauce";
import { BurgerIngredientMain } from "./burger-ingredient-main";
import { Modal } from "../uikit/modal";
import { IngredientDetails } from "../uikit/modal-content/ingredient-details";
import { useSelector } from "react-redux";

const BurgerIngredients = () => {
  const [current, setCurrent] = useState("one");

  const burgerMenuRef = useRef(null);

  const menuItems = ["one", "two", "three"];

  const handleScroll = () => {
    const sections = burgerMenuRef.current.children;

    for (let i = 0; i < sections.length; i++) {
      const sectionRect = sections[i].getBoundingClientRect();
      if (sectionRect.top >= 0 && sectionRect.top < window.innerHeight) {
        setCurrent(menuItems[i]);
        break;
      }
    }
  };

  useEffect(() => {
    const burgerMenuElement = burgerMenuRef.current;
    burgerMenuElement.addEventListener("scroll", handleScroll);

    return () => {
      burgerMenuElement.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isOpenModalWindow = useSelector(state => state.addData.isOpenModal);

  return (
    <section className={styles.section_burgers}>
      <h1 className={`${styles.title}text text_type_main-large`}>
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
      <section className={styles.burger_menu} ref={burgerMenuRef}>
        <BurgerIngredientBun />
        <BurgerIngredientSauce />
        <BurgerIngredientMain />
      </section>
      {isOpenModalWindow && (
        <Modal title="Детали ингредиента" >
          <IngredientDetails />
        </Modal>
      )}
    </section>
  );
};

export { BurgerIngredients };

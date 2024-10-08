import { React, useState, useRef, useEffect } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredient.module.css";
import { Modal } from "../uikit/modal";
import { IngredientDetails } from "../uikit/modal-content/ingredient-details";
import { useSelector } from "react-redux";
import { useGetFetchQuery } from "../../services/fetch-ingredients";
import { BurgerItem } from "./burger-item";

const BurgerIngredients = () => {
  const {
    ingredients = [],
    error,
    isSucces,
  } = useGetFetchQuery(undefined, {
    selectFromResult: ({ data }) => ({
      ingredients: data?.ingredients,
    }),
  });

  const buns = ingredients.filter((sauce) => sauce.type === "bun");
  const sauces = ingredients.filter((sauce) => sauce.type === "sauce");
  const mains = ingredients.filter((sauce) => sauce.type === "main");

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

  const isOpenModalWindow = useSelector((state) => state.addData.isOpenModal);

  if (error) return <h1>{error}</h1>;
  if (isSucces) return ingredients;

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
        <div>
          <h1 className={`${styles.title}text text_type_main-medium`}>Булки</h1>
          <div className={styles.burger_menu_inner}>
            {buns.map((item) => (
              <div key={item._id} className={styles.main_inner}>
                <div className={styles.main_inner}>
                  <BurgerItem data={item} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1 className={`${styles.title}text text_type_main-medium`}>Соусы</h1>
          <div className={styles.burger_menu_inner}>
            {sauces.map((item) => (
              <div key={item._id} className={styles.main_inner}>
                <div className={styles.main_inner}>
                  <BurgerItem data={item} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1 className={`${styles.title}text text_type_main-medium`}>
            Начинки
          </h1>
          <div className={styles.burger_menu_inner}>
            {mains.map((item, index) => (
              <div key={item._id} className={styles.main_inner}>
                <div className={styles.main_inner}>
                  <BurgerItem data={item} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {isOpenModalWindow && (
        <Modal title="Детали ингредиента">
          <IngredientDetails />
        </Modal>
      )}
    </section>
  );
};

export { BurgerIngredients };

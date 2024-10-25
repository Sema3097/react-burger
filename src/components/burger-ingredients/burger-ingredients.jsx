import { React, useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredient.module.css";
import { BurgerItem } from "./burger-item";
import { Link, useLocation } from "react-router-dom";

const BurgerIngredients = ({ ingredients }) => {
  const location = useLocation();

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
              <Link
                key={item._id}
                to={`/ingredients/${item._id}`}
                state={{ backgroundLocation: location }}
              >
                <div key={item._id} className={styles.main_inner}>
                  <div className={styles.main_inner}>
                    <BurgerItem data={item} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h1 className={`${styles.title}text text_type_main-medium`}>Соусы</h1>
          <div className={styles.burger_menu_inner}>
            {sauces.map((item) => (
              <Link
                key={item._id}
                to={`/ingredients/${item._id}`}
                state={{ backgroundLocation: location }}
              >
                <div key={item._id} className={styles.main_inner}>
                  <div className={styles.main_inner}>
                    <BurgerItem data={item} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h1 className={`${styles.title}text text_type_main-medium`}>
            Начинки
          </h1>
          <div className={styles.burger_menu_inner}>
            {mains.map((item) => (
              <Link
                key={item._id}
                to={`/ingredients/${item._id}`}
                state={{ backgroundLocation: location }}
              >
                <div key={item._id} className={styles.main_inner}>
                  <div className={styles.main_inner}>
                    <BurgerItem data={item} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape(ingredientPropType.isRequired))
    .isRequired,
};

export { BurgerIngredients };

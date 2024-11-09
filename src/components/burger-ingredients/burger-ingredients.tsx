import React, { useState, useRef, useEffect, FC } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredient.module.css";
import { BurgerItem } from "./burger-item";
import { Link, useLocation } from "react-router-dom";
import { IingredientsProps } from "../../utils/types";

const BurgerIngredients: FC<IingredientsProps> = ({ ingredients }) => {
  const location = useLocation();

  const buns = ingredients.filter((bun) => bun.type === "bun");
  const sauces = ingredients.filter((sauce) => sauce.type === "sauce");
  const mains = ingredients.filter((main) => main.type === "main");

  const [current, setCurrent] = useState<string>("one");

  const burgerMenuRef = useRef<HTMLDivElement>(null);

  const menuItems = ["one", "two", "three"];

  const handleScroll = (): void => {
    const sections = burgerMenuRef.current?.children;
    if (sections) {
      for (let i = 0; i < sections.length; i++) {
        const sectionRect = sections[i].getBoundingClientRect();
        if (sectionRect.top >= 0 && sectionRect.top < window.innerHeight) {
          setCurrent(menuItems[i]);
          break;
        }
      }
    }
  };

  useEffect(() => {
    const burgerMenuElement = burgerMenuRef.current;
    if (burgerMenuElement) {
      burgerMenuElement.addEventListener("scroll", handleScroll);

      return () => {
        burgerMenuElement.removeEventListener("scroll", handleScroll);
      };
    }
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

export { BurgerIngredients };

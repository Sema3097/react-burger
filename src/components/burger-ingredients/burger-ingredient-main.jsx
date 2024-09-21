import React from "react";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/types";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./item-ingredient.module.css";

const BurgerIngredientMain = ({ data }) => {
  return (
    <div className={styles.main}>
      <h2>Начинка</h2>
      <div className={styles.main_inner}>
        {data.map((e) => (
          <div key={e._id} className={styles.main_item}>
            {e.type === "main" && (
              <div className={styles.main_item_card}>
                <Counter
                  count={1}
                  size="default"
                  extraClass="m-1"
                  className={styles.counter}
                />
                <img src={e.image} alt="logo" />
                <div className={styles.main_info}>
                  <span className="text text_type_digits-default">
                    {e.price}
                  </span>
                  <CurrencyIcon type="primary" />
                </div>
                <article
                  className={`${styles.name} text text_type_main-default`}
                >
                  {e.name}
                </article>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

BurgerIngredientMain.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(ingredientPropType.isRequired))
    .isRequired,
};

export { BurgerIngredientMain };

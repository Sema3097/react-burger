import React from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./item-ingredient.module.css";

const BurgerIngredientBun = ({ data }) => {
  return (
    <div>
      <h2>Булки</h2>
      <ul>
        {data.map((e) => (
          <li key={e._id}>
            {e.type === "bun" && (
              <div>
                <img src={e.image} alt="logo" />
                <div>
                  <span className="text text_type_digits-default">
                    {e.price}
                  </span>
                  <CurrencyIcon type="primary" />
                </div>
                <article className="text text_type_main-default">
                  {e.name}
                </article>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export { BurgerIngredientBun };

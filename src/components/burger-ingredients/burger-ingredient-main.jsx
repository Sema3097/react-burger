import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./item-ingredient.module.css";

const BurgerIngredientMain = ({ data }) => {
  return (
    <div>
      <h2>Начинка</h2>
      <div>
        {data.map((e) => (
          <div key={e._id}>
            {e.type === "main" && (
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
          </div>
        ))}
      </div>
    </div>
  );
};

export { BurgerIngredientMain };

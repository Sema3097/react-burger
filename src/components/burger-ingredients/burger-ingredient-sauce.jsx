import React from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./item-ingredient.module.css";

const BurgerIngredientSauce = ({ data }) => {
  return (
    <div>
      <h2>Соусы</h2>
      <div>
        {data.map((e) => (
          <div key={e._id}>
            {e.type === "sauce" && (
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

export { BurgerIngredientSauce };

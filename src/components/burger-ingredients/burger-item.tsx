import React, { FC } from "react";
import styles from "./item-ingredient.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { Iingredient } from "../../utils/types";
import { useAppSelector } from "../../services/hooks/redux";

interface IBurgerItem {
  data: Iingredient;
}

const BurgerItem: FC<IBurgerItem> = ({ data }) => {
  const burgerFilling = useAppSelector(
    (state: { filling: { burgerFilling: Iingredient[] } }) =>
      state.filling.burgerFilling
  );
  const burgerBuns = useAppSelector(
    (state: { filling: { burgerBuns: Iingredient[] } }) =>
      state.filling.burgerBuns
  );

  const getIngredientCount = (data: Iingredient) => {
    if (data.type === "bun") {
      const selectedBun = burgerBuns.find((ing) => ing.type === "bun");
      return selectedBun && selectedBun.name === data.name ? 2 : 0;
    } else {
      return burgerFilling.filter((ing) => ing.name === data.name).length;
    }
  };

  const [, drugRef] = useDrag({
    type: "filling",
    item: data,
  });

  return (
    <div ref={drugRef} className={styles.main_item_card}>
      <Counter
        count={getIngredientCount(data)}
        size="default"
        extraClass="m-1"
      />
      <img src={data.image} alt="logo" />
      <div className={styles.main_info}>
        <span className="text text_type_digits-default">{data.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <article className={`${styles.name} text text_type_main-default`}>
        {data.name}
      </article>
    </div>
  );
};

export { BurgerItem };

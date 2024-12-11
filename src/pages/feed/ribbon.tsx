import React, { FC } from "react";
import { Iingredient, IOrder } from "../../utils/types";
import styles from "./feed.module.css";
import { FeedItem } from "./feed-item";
import { nanoid } from "@reduxjs/toolkit";

interface IRibbon {
  ingredients: Iingredient[];
  ordersWss: IOrder[];
}

const Ribbon: FC<IRibbon> = ({ ingredients, ordersWss }) => {
  const feedItemIngredients = ordersWss.map((order) => {
    return order.ingredients
      .map((orderIngredientId) =>
        ingredients.find(
          (ingredient) => ingredient._id === String(orderIngredientId)
        )
      )
      .filter(Boolean)
      .map((ingredient) => ({
        ...ingredient,
        uniqueid: nanoid(),
      })) as Iingredient[];
  });

  return (
    <section className={styles.orders}>
      {ordersWss.map((item, index) => (
        <FeedItem
          key={item._id}
          ordersWss={ordersWss}
          item={item}
          ingredients={feedItemIngredients[index]}
        />
      ))}
    </section>
  );
};

export { Ribbon };

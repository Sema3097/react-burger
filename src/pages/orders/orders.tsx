import React, { FC, useEffect } from "react";
import styles from "./order-styles.module.css";
import { useAppDispatch, useAppSelector } from "../../services/hooks/redux";
import { WSS_API_Profile } from "../../utils/data";
import { wsConnectProfile, wsDisconnectProfile } from "../../services/ws-feed-profile/actions";
import { getResponsesProfile } from "../../services/ws-feed-profile/slice";
import { Iingredient } from "../../utils/types";
import { nanoid } from "@reduxjs/toolkit";
import { FeedItemOrder } from "./feed-item-order";

interface IFeedOrder {
  ingredients: Iingredient[];
}

const FeedOrders: FC<IFeedOrder> = ({ingredients}) => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(wsConnectProfile(WSS_API_Profile));
    
    return () => {
      dispatch(wsDisconnectProfile());
    };
  }, [dispatch])

  const responseWss = useAppSelector(getResponsesProfile);

  const ordersWss = responseWss.orders;

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
    <div className={`${styles.title} text text_type_main-large`}>
      <section className={styles.orders}>
      {ordersWss.map((item, index) => (
        <FeedItemOrder
          ordersWss={ordersWss}
          key={item._id}
          item={item}
          ingredients={feedItemIngredients[index]}
        />
      ))}
    </section>
    </div>
  );
};

export { FeedOrders };

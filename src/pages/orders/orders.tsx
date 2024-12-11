import React, { FC, useEffect, useState } from "react";
import styles from "./order-styles.module.css";
import { useAppDispatch, useAppSelector } from "../../services/hooks/redux";
import {
  wsConnectProfile,
  wsDisconnectProfile,
} from "../../services/ws-feed-profile/actions";
import { getResponsesProfile } from "../../services/ws-feed-profile/slice";
import { Iingredient } from "../../utils/types";
import { nanoid } from "@reduxjs/toolkit";
import { FeedItemOrder } from "./feed-item-order";
import { WSS_API } from "../../utils/data";

interface IFeedOrder {
  ingredients: Iingredient[];
}

const FeedOrders: FC<IFeedOrder> = ({ ingredients }) => {
  const [isWsConnected, setWsConnected] = useState(false);
  const isAuthChecked = useAppSelector((state) => state.user.isAuthChecked);
  const dispatch = useAppDispatch();

  
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const adressToken = token?.slice(7);
    if (isAuthChecked) {
      dispatch(wsConnectProfile(`${WSS_API}?token=${adressToken}`));
      setWsConnected(true);
    }
    return () => {
      dispatch(wsDisconnectProfile());
      setWsConnected(false);
    };
  }, [dispatch, isAuthChecked]);

  const responseWss = useAppSelector(getResponsesProfile);

  const ordersWss = responseWss.orders || [];

  const feedItemIngredients =
    ordersWss?.map((order) => {
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
    }) || [];

  if (!responseWss.orders || ingredients.length === 0) {
    return <p>Загрузка...</p>;
  }
  if (!isWsConnected) {
    return <p>Подключение...</p>;
  }

  return (
    <div className={`${styles.title} text text_type_main-large`}>
      <section className={styles.orders}>
        {ordersWss?.map((item, index) => (
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
import React, { FC } from "react";
import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Iingredient, IOrder } from "../../utils/types";
import styles from "./feed.module.css";
import { useLocation, useNavigate } from "react-router-dom";

interface IFeedItem {
  ingredients: Iingredient[];
  item: IOrder;
  ordersWss: IOrder[];
}

const FeedItem: FC<IFeedItem> = ({ ingredients, item, ordersWss }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleOrderClick = (orderNumber: number) => {
    const backgroundLocation = {
      ...location,
      state: {
        backgroundLocationOrder: location,
        ingredients: ingredients,
        ordersWss: ordersWss,
        orderNumber: orderNumber,
      },
    };
    navigate(`/feed/${orderNumber}`, { state: backgroundLocation });
  };

  const visibleIngredients = ingredients.slice(0, 6);
  const hiddenImagesCount = ingredients.length - visibleIngredients.length;

  const totalPrice = ingredients.reduce(
    (acc: number, item: Iingredient) => acc + item.price,
    0
  );

  return (
    <section
      className={styles.feed_item__container}
      onClick={() => handleOrderClick(item.number)}
    >
      <div className={styles.feed_item__header}>
        <p className="text text_type_digits-default">#{item.number}</p>
        <div className={styles.times}>
          <FormattedDate
            className="text text_type_main-default text_color_inactive"
            date={new Date(item.createdAt)}
          />
          <span className="text text_type_main-default text_color_inactive">
            i-GMT+3
          </span>
        </div>
      </div>
      <h3 className="text text_type_main-medium">{item.name}</h3>
      <div className={styles.feed_items__footer}>
        <div className={styles.carousel_container}>
          <div className={styles.images_wrapper}>
            {visibleIngredients.map((item) => (
              <div key={item.uniqueid} className={styles.image_container}>
                <img src={item.image} alt="logo" className={styles.image} />
              </div>
            ))}
            {hiddenImagesCount > 0 && (
              <div
                className={`${styles.hidden_images} text text_type_digits-medium`}
              >
                +{hiddenImagesCount}
              </div>
            )}
          </div>
        </div>
        <p className="text text_type_digits-default">
          {totalPrice} <CurrencyIcon type="primary" />
        </p>
      </div>
    </section>
  );
};

export { FeedItem };

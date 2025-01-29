import React, { FC } from "react";
import { Iingredient, IOrder } from "../../utils/types";
import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-styles.module.css";
import { Link, useLocation } from "react-router-dom";

interface IFeedItemOrder {
  ordersWss: IOrder[];
  item: IOrder;
  ingredients: Iingredient[];
}

const FeedItemOrder: FC<IFeedItemOrder> = ({
  ordersWss,
  item,
  ingredients,
}) => {
  const location = useLocation();

  const orderLink = `/profile/orders/${item.number}`;

  const visibleIngredients = ingredients.slice(0, 6);
  const hiddenImagesCount = ingredients.length - visibleIngredients.length;

  const totalPrice = ingredients.reduce(
    (acc: number, item: Iingredient) => acc + item.price,
    0
  );

  const currentOrder: IOrder | undefined = ordersWss.find(
    (order) => order.status
  );

  const renderStatus = (order: IOrder | undefined) => {
    if (!order) return null;
    if (order.status === "done") {
      return (
        <p
          className={`${styles.ViewOrder__status_done} text text_type_main-default`}
        >
          Выполнен
        </p>
      );
    } else if (order.status === "created") {
      return (
        <p
          className={`${styles.ViewOrder__status} text text_type_main-default`}
        >
          Создан
        </p>
      );
    } else if (order.status === "pending") {
      return (
        <p
          className={`${styles.ViewOrder__status} text text_type_main-default`}
        >
          Готовится
        </p>
      );
    }
  };

  return (
    <Link
      to={orderLink} 
      state={{backgroundLocation: location}} 
      className={styles.feed_item__container}
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
      <div>{renderStatus(currentOrder)}</div>
      <div className={styles.feed_items__footer}>
        <div className={styles.carousel_container}>
          <div className={styles.images_wrapper}>
            {visibleIngredients.map((ingredient) => (
              <div key={ingredient.uniqueid} className={styles.image_container}>
                <img src={ingredient.image} alt="logo" className={styles.image} />
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
    </Link>
  );
};

export { FeedItemOrder };
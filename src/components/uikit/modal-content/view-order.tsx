import React, { FC, useEffect, useState } from "react";
import styles from "./view-order.module.css";
import { Iingredient, IOrder, IResponseWSS } from "../../../utils/types";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../services/hooks/redux";
import { BASE_URL_API } from "../../../utils/data";

interface IViewOrder {
  ingredients: Iingredient[];
  openFeed?: () => void;
  newModal?: () => void;
}

interface IingredientWithCount extends Iingredient {
  count: number;
}

const ViewOrder: FC<IViewOrder> = ({ ingredients }) => {
  const [data, setData] = useState<IResponseWSS | null>(null);

  useEffect(() => {
    if (!order) {
      fetchData();
    }
  }, []);

  const { number } = useParams();

  let order = useAppSelector((state) => {
    if (number) {
      let order = state.feedOrders.response.orders?.find(
        (item) => item.number === +number
      );
      if (order) {
        return order;
      }

      order = state.feedOrdersProfile.responseProfile.orders?.find(
        (item) => item.number === +number
      );
      if (order) {
        return order;
      }
    }
  });

  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL_API}orders/${number}`);
      if (!response.ok) {
        throw new Error("Ошибка при загрузке данных");
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  if (!order && data) {
    order = data.orders[0];
  }

  const matchedIngredients = (order?.ingredients ?? [])
    .map((orderIngredientId) => {
      const ingredient = ingredients.find(
        (item) => item._id === String(orderIngredientId)
      );
      return ingredient || null;
    })
    .filter((ingredient): ingredient is Iingredient => ingredient !== null);

  const totalPrice = matchedIngredients.reduce(
    (acc, item) => acc + item.price,
    0
  );

  const ingredientCounts = (order?.ingredients ?? []).reduce(
    (acc: Record<string, IingredientWithCount>, orderIngredientId) => {
      const ingredient = ingredients.find(
        (item) => item._id === String(orderIngredientId)
      );
      if (ingredient) {
        if (acc[ingredient._id]) {
          acc[ingredient._id].count += 1;
        } else {
          acc[ingredient._id] = { ...ingredient, count: 1 };
        }
      }
      return acc;
    },
    {}
  );

  const uniqueIngredients: IingredientWithCount[] =
    Object.values(ingredientCounts);

  const renderStatus = (order: IOrder | undefined) => {
    if (!order) return null;
    if (order.status === "done") {
      return (
        <p
          className={`${styles.ViewOrder__status_done} text text_type_main-medium`}
        >
          Выполнен
        </p>
      );
    } else if (order.status === "created") {
      return (
        <p className={`${styles.ViewOrder__status} text text_type_main-medium`}>
          Создан
        </p>
      );
    } else if (order.status === "pending") {
      return (
        <p className={`${styles.ViewOrder__status} text text_type_main-medium`}>
          Готовится
        </p>
      );
    }
  };

  return (
    <section className={styles.ViewOrder__container}>
      <div>
        <p
          className={`${styles.ViewOrder__number} text text_type_digits-medium`}
        >
          #{number}
        </p>
        <p className={`${styles.ViewOrder__name} text text_type_main-large`}>
          {order?.name}
        </p>
      </div>
      {renderStatus(order)}
      <p className="text text_type_main-large">Состав:</p>
      <div className={styles.allIngredients}>
        {(uniqueIngredients || []).map((item) => (
          <div key={item._id} className={styles.ViewOrder__ingredients}>
            <div className={styles.mini_container}>
              <img src={item.image} alt={item.name} />
              <p className="text text_type_main-medium">{item.name}</p>
            </div>
            <p className={`${styles.price} text text_type_main-medium`}>
              {item.count} x {item.price} <CurrencyIcon type="primary" />
            </p>
          </div>
        ))}
      </div>
      {order?.createdAt && (
        <div className={styles.view_order__container_footer}>
          <div className={styles.view_order__footer}>
            <FormattedDate
              date={new Date(order.createdAt)}
              className="text_type_main-medium text_color_inactive"
            />
            <p
              className={`${styles.view_order__footer_text} text text_type_main-medium text_color_inactive`}
            >
              i-GMT+3
            </p>
          </div>
          <div className={styles.total_price}>
            <p className="text text_type_main-medium">{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      )}
    </section>
  );
};

export { ViewOrder };

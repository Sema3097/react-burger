import React, { FC, useEffect, useState } from "react";
import styles from "./view-order.module.css";
import { Iingredient, IOrder } from "../../../utils/types";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useLocation, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../services/hooks/redux";
import { wsConnect, wsDisconnect } from "../../../services/ws-feed/actions";
import { WSS_API, WSS_API_Profile } from "../../../utils/data";
import { wsConnectProfile, wsDisconnectProfile } from "../../../services/ws-feed-profile/actions";

interface IViewOrder {
  ingredients: Iingredient[];
  openFeed?: () => void;
  newModal?: () => void;
}

interface IingredientWithCount extends Iingredient {
  count: number;
}

const ViewOrder: FC<IViewOrder> = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(wsConnect(WSS_API));
    dispatch(wsConnectProfile(WSS_API_Profile))
    if (!order) {
      fetchData();
    }
    return () => {
      dispatch(wsDisconnectProfile());
      dispatch(wsDisconnect());
    }
  }, [dispatch]);

  const { number } = useParams();
  const { state } = useLocation();

  const ingredients = state?.state.ingredients || [];
  const ordersWss: IOrder[] = state?.state.ordersWss || [];
  const orderNumber = state?.state.orderNumber;

  const order = useAppSelector((state) => {
    if (number) {
      let order = state.feedOrders?.response?.orders.find(
        (item) => item.number === +number
      );
      if (order) {
        return order;
      }

      order = state.feedOrdersProfile?.responseProfile?.orders.find(
        (item) => item.number === +number
      );
      if (order) {
        return order;
      }
    }
  });

  console.log(order)

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://norma.nomoreparties.space/api/orders/${number}`
      );
      if (!response.ok) {
        throw new Error("Ошибка при загрузке данных");
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const currentOrder: IOrder | undefined = ordersWss.find(
    (item) => item.number === orderNumber
  );

  const totalPrice = ingredients.reduce(
    (acc: number, item: Iingredient) => acc + item.price,
    0
  );

  const ingredientCounts = ingredients.reduce(
    (acc: Record<string, IingredientWithCount>, item: Iingredient) => {
      if (acc[item._id]) {
        acc[item._id].count += 1;
      } else {
        acc[item._id] = { ...item, count: 1 };
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
      {currentOrder && (
        <div>
          <p
            className={`${styles.ViewOrder__number} text text_type_digits-medium`}
          >
            #{currentOrder.number}
          </p>
          <p className={`${styles.ViewOrder__name} text text_type_main-large`}>
            {currentOrder.name}
          </p>
        </div>
      )}
      {renderStatus(currentOrder)}
      <p className="text text_type_main-large">Состав:</p>
      <div className={styles.allIngredients}>
        {uniqueIngredients.map((item) => (
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
      {currentOrder && (
        <div className={styles.view_order__container_footer}>
          <div className={styles.view_order__footer}>
            <FormattedDate
              date={new Date(currentOrder.createdAt)}
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

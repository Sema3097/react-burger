import React, { FC, useEffect } from "react";
import styles from "./feed.module.css";
import { IingredientsProps, IOrder } from "../../utils/types";
import { Ribbon } from "./ribbon";
import Update from "../../images/update.svg";
import { useAppDispatch, useAppSelector } from "../../services/hooks/redux";
import { getResponse } from "../../services/ws-feed/slice";
import { wsConnect, wsDisconnect } from "../../services/ws-feed/actions";
import { WSS_API } from "../../utils/data";

const Feed: FC<IingredientsProps> = ({ ingredients }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(wsConnect(WSS_API));
    
    return () => {
      dispatch(wsDisconnect());
    };
  }, [dispatch]);

  const responseWss = useAppSelector(getResponse);

  const ordersWss: IOrder[] = responseWss.orders;

  const ordersDone = ordersWss.filter((item) => item.status === "done");
  const ordersAtWork = ordersWss.filter(
    (item) => item.status === "created" || item.status === "pending"
  );
  const visibleNumbersDone = ordersDone.slice(0, 7);
  const visibleNumbersAtWork = ordersAtWork.slice(0, 7);

  return (
    <main className={styles.orderFeed_container}>
      <div className={styles.orderFeed_header}>
        <h1 className={`${styles.orderFeed_title} text text_type_main-large`}>
          Лента заказов
        </h1>
        <button className={styles.update}>
          <img src={Update} alt="icon" />
          <p className="text text_type_main-default">Обновить</p>
        </button>
      </div>
      <div className={styles.container_inner}>
        <Ribbon
          ordersWss={ordersWss}
          ingredients={ingredients}
        />
        <section className={styles.info}>
          <div className={styles.orders_numbers}>
            <div>
              <p className="text text_type_main-medium">Готовы:</p>
              {visibleNumbersDone.map((item) => (
                <div key={item._id} className={styles.finished_orders}>
                  <p className="text text_type_digits-default">{item.number}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="text text_type_main-medium">В работе:</p>
              {visibleNumbersAtWork.map((item) => (
                <div key={item._id} className={styles.orders_in_progress}>
                  <p className="text text_type_digits-default">{item.number}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.total_orders}>
            <p className="text text_type_main-medium">
              Выполнено за все время:
            </p>
            <h2
              className={`${styles.total_numbers} text text_type_digits-large`}
            >
              {responseWss.total}
            </h2>
          </div>
          <div>
            <p className="text text_type_main-medium">Выполнено за сегодня:</p>
            <h2
              className={`${styles.total_numbers} text text_type_digits-large`}
            >
              {responseWss.totalToday}
            </h2>
          </div>
        </section>
      </div>
    </main>
  );
};

export { Feed };

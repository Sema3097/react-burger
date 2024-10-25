import React from "react";
import styles from './pages.module.css'

const OrderFeed = () => {
  return (
    <div className={styles.orderFeed_container}>
      <h1 className="text text_type_main-large">
        Здесь будет отображаться лента ваших заказов
      </h1>
    </div>
  );
};

export { OrderFeed };

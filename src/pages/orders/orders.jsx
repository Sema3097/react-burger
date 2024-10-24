import React from "react";
import styles from "./order-styles.module.css";

const Orders = () => {
  return (
    <h1 className={`${styles.title} text text_type_main-large`}>
      Здесь будут отображаться Ваши заказы
    </h1>
  );
};

export { Orders };

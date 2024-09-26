import React from "react";
import styles from "./modal-content.module.css";
import Done from "../../../images/done.svg";

const OrderDetails = () => {
  return (
    <div className={styles.OrderDetails_container}>
      <h1
        className={`${styles.OrderDetails_number} text text_type_digits-large`}
      >
        034536
      </h1>
      <h3 className={`${styles.OrderDetails_title}text text_type_main-medium`}>
        идентификатор заказа
      </h3>
      <img className={styles.OrderDetails_image} src={Done} alt="icon" />
      <p className="text text_type_main-default">Ваш заказ начали готовить</p>
      <p
        className={`${styles.OrderDetails_footer}text text_type_main-default text_color_inactive`}
      >
        Дождитесь готовности на орбиальной станции
      </p>
    </div>
  );
};

export { OrderDetails };

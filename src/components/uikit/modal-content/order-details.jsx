import React from "react";
import styles from "./modal-content.module.css";
import Done from "../../../images/done.svg";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../../utils/types";

const OrderDetails = ({ responseData }) => {
  if (!responseData || !responseData.order || !responseData.order.number) {
    return <h1>Нет данных</h1>;
  }
  return (
    <div className={styles.OrderDetails_container}>
      <h1
        className={`${styles.OrderDetails_number} text text_type_digits-large`}
      >
        {responseData.order.number}
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

OrderDetails.propTypes = {
  responseData: PropTypes.shape({
    success: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    order: PropTypes.shape({
      createdAt: PropTypes.string.isRequired,
      ingredients: PropTypes.arrayOf(
        PropTypes.shape(ingredientPropType.isRequired)
      ).isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
      owner: PropTypes.shape({
        createdAt: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        updatedAt: PropTypes.string.isRequired,
      }).isRequired,
      price: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
    }).isRequired,
  }),
};

export { OrderDetails };

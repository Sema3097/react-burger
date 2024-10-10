import React from "react";
import PropTypes from "prop-types";
import styles from "./uikit.module.css";

const ModalOverlay = ({ closeOrderDetails, closeIngredientDetails }) => {
  const closeModalWindow = () => {
    closeOrderDetails && closeOrderDetails();
    closeIngredientDetails && closeIngredientDetails();
  };

  return <div className={styles.modal_overlay} onClick={closeModalWindow} />;
};

export { ModalOverlay };

ModalOverlay.propTypes = {
  closeOrderDetails: PropTypes.func,
  closeIngredientDetails: PropTypes.func,
};

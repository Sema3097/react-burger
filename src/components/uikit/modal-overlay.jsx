import React from "react";
import PropTypes from "prop-types";
import styles from "./uikit.module.css";

const ModalOverlay = ({ closeModal }) => {
  return <div className={styles.modal_overlay} onClick={closeModal} />;
};

export { ModalOverlay };

ModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

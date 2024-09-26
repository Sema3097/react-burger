import React from "react";
import PropTypes from "prop-types";
import styles from "./uikit.module.css";

const ModalOverlay = ({ onClose }) => {
  return <div className={styles.modal_overlay} onClick={() => onClose()} />;
};

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export { ModalOverlay };

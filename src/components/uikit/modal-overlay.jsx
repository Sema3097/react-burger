import React from "react";
import PropTypes from "prop-types";
import styles from "./uikit.module.css";
import { useDispatch } from "react-redux";
import { closeModal } from "../../services/add-data-to-modal";
import { closesModal } from "../../services/getting-and-updating-modal";
import { deleteData } from "../../services/add-data-to-modal";

const ModalOverlay = () => {
  const dispatch = useDispatch();
  const closeModalWindow = () => {
    dispatch(closeModal(false));
    dispatch(deleteData());
    dispatch(closesModal(false));
  };

  return <div className={styles.modal_overlay} onClick={() => closeModalWindow()} />;
};

// ModalOverlay.propTypes = {
//   onClose: PropTypes.func.isRequired,
// };

export { ModalOverlay };

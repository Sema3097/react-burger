import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./uikit.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { createPortal } from "react-dom";
import { ModalOverlay } from "./modal-overlay";

const modalElement = document.getElementById("modal");

const Modal = ({
  children,
  title,
  closeOrderDetails,
  closeIngredientDetails,
}) => {
  useEffect(() => {
    function onEsc(e) {
      if (e.code === "Escape") {
        closeModal();
      }
    }
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, []);

  const closeModal = () => {
    closeIngredientDetails && closeIngredientDetails();
    closeOrderDetails && closeOrderDetails();
  };

  return createPortal(
    <>
      <div className={styles.modal}>
        <header className={styles.header}>
          <article className="text text_type_main-medium">{title}</article>
          <CloseIcon
            onClick={closeModal}
            type="primary"
            className={styles.cross}
          />
        </header>
        <main>{children}</main>
      </div>
      <ModalOverlay
        closeOrderDetails={closeOrderDetails}
        closeIngredientDetails={closeIngredientDetails}
      />
    </>,
    modalElement
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element.isRequired,
  closeOrderDetails: PropTypes.func,
  closeIngredientDetails: PropTypes.func,
};

export { Modal };

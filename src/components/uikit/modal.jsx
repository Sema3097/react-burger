import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./uikit.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { createPortal } from "react-dom";
import { ModalOverlay } from "./modal-overlay";

const modalElement = document.getElementById("modal");

const Modal = ({ children, onClose, title }) => {
  useEffect(() => {
    function onEsc(e) {
      if (e.code === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [onClose]);

  return createPortal(
    <>
      <div className={styles.modal}>
        <header className={styles.header}>
          <article className="text text_type_main-medium">{title}</article>
          <CloseIcon
            onClick={() => onClose()}
            type="primary"
            className={styles.cross}
          />
        </header>
        <main>{children}</main>
      </div>
      <ModalOverlay onClose={onClose} />
    </>,
    modalElement
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.element.isRequired,
};

export { Modal };

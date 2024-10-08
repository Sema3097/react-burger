import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./uikit.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { createPortal } from "react-dom";
import { ModalOverlay } from "./modal-overlay";
import { useDispatch } from "react-redux";
import { closeModal } from "../../services/add-data-to-modal";
import { closesModal } from "../../services/getting-and-updating-modal";
import { deleteData } from "../../services/add-data-to-modal";

const modalElement = document.getElementById("modal");

const Modal = ({ children, title }) => {
  useEffect(() => {
    function onEsc(e) {
      if (e.code === "Escape") {
        closeModalWindow();
      }
    }
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, []);

  const dispatch = useDispatch();
  const closeModalWindow = () => {
    dispatch(closeModal(false));
    dispatch(deleteData());
    dispatch(closesModal(false));
  };

  return createPortal(
    <>
      <div className={styles.modal}>
        <header className={styles.header}>
          <article className="text text_type_main-medium">{title}</article>
          <CloseIcon
            onClick={() => closeModalWindow()}
            type="primary"
            className={styles.cross}
          />
        </header>
        <main>{children}</main>
      </div>
      <ModalOverlay />
    </>,
    modalElement
  );
};

// Modal.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   title: PropTypes.string,
//   children: PropTypes.element.isRequired,
// };

export { Modal };

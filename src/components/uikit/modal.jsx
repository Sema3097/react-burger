import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./uikit.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { createPortal } from "react-dom";
import { ModalOverlay } from "./modal-overlay";
import { useNavigate } from "react-router-dom";

const modalElement = document.getElementById("modal");

const Modal = ({ children, title, closeOrderDetails, loading }) => {
  useEffect(() => {
    function onEsc(e) {
      if (e.code === "Escape") {
        closeModal();
      }
    }
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, []);

  const navigate = useNavigate();

  const closeModal = () => {
    (closeOrderDetails && closeOrderDetails()) || navigate("/");
  };

  return createPortal(
    <>
      <div className={styles.modal}>
        <header className={styles.header}>
          <article className="text text_type_main-medium">{title}</article>
          {loading ? null : (
            <CloseIcon
              onClick={closeModal}
              type="primary"
              className={styles.cross}
            />
          )}
        </header>
        <main>{children}</main>
      </div>
      <ModalOverlay closeModal={closeModal} />
    </>,
    modalElement
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element.isRequired,
  closeOrderDetails: PropTypes.func,
  loading: PropTypes.bool,
};

export { Modal };

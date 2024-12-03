import React, { FC, ReactNode, useEffect } from "react";
import styles from "./uikit.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { createPortal } from "react-dom";
import { ModalOverlay } from "./modal-overlay";
import { useNavigate } from "react-router-dom";

interface IModal {
  children: ReactNode;
  title?: string;
  closeOrderDetails?: () => void;
  loading?: boolean;
}

const modalElement: HTMLElement | null = document.getElementById("modal");

const Modal: FC<IModal> = ({ children, title, closeOrderDetails, loading }) => {
  useEffect(() => {
    function onEsc(e: KeyboardEvent) {
      if (e.code === "Escape") {
        closeModal();
      }
    }
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, []);

  const navigate = useNavigate();

  const closeModal = (): void => {
    if (closeOrderDetails) {
      closeOrderDetails();
    } else {
      navigate(-1);
    }
  };

  if (!modalElement) {
    return null;
  }

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

export { Modal };

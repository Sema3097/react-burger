import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./pages.module.css";

const NotFoundPages = () => {
  const navigate = useNavigate();
  const back = () => {
    navigate(-1);
  };
  return (
    <div className={styles.not_found_container}>
      <h1
        className={`${styles.not_found_container_title} text text_type_main-medium text_color_inactive`}
      >
        Упс... Похоже, вы не туда попали!
      </h1>
      <Button
        onClick={back}
        htmlType="button"
        type="primary"
        size="large"
        extraClass="ml-2"
      >
        {" "}
        Обратно{" "}
      </Button>
    </div>
  );
};

export { NotFoundPages };

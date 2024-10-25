import { React, useState } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./pages.module.css";
import { Link, useNavigate } from "react-router-dom";
import { FORGOT_PASSWORD } from "../utils/data";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const restorePassword = (e) => {
    e.preventDefault();

    fetch(FORGOT_PASSWORD, {
      method: "POST",
      body: JSON.stringify({ email }),
    })
      .then((res) => {
        if (res.ok) {
          navigate("/reset-password", {state: {fromForgot: true}});
        }
        return res.json();
      })
      .catch((error) => {
        console.error(error);
      });

    setEmail("");
  };

  return (
    <div className={styles.container}>
      <form className={styles.container__inner} onSubmit={restorePassword}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <Input
          placeholder={"Укажите e-mail"}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name={"name"}
        />
        <div>
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            extraClass="ml-2"
          >
            Восстановить
          </Button>
        </div>
        <div className="text text_type_main-default text_color_inactive">
          <p>
            Вспомнили пароль?
            <Link to={"/login"} className={styles.link}>
              {" "}
              Войти
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export { ForgotPassword };

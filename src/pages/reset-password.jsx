import { React, useState } from "react";
import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./pages.module.css";
import { Link, useNavigate } from "react-router-dom";
import { RESET_PASSWORD } from "../utils/data";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const throwPassword = (e) => {
    e.preventDefault();

    fetch(RESET_PASSWORD, {
      method: "POST",
      body: JSON.stringify({ password: password, token: token }),
    })
      .then((res) => {
        if (res.ok) {
          navigate("/");
        }
        return res.json();
      })
      .catch((error) => {
        console.error(error);
      });

    setPassword("");
    setToken("");
  };

  return (
    <div className={styles.container}>
      <form className={styles.container__inner} onSubmit={throwPassword}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <PasswordInput
          autoComplete="password"
          placeholder={"Введите новый пароль"}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name={"password"}
        />
        <Input
          autoComplete=""
          placeholder={"Введите код из письма"}
          onChange={(e) => setToken(e.target.value)}
          value={token}
          name={"name"}
        />
        <div>
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            extraClass="ml-2"
          >
            Сохранить
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

export { ResetPassword };

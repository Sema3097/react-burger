import React, { FC, FormEvent, useEffect, useState } from "react";
import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./pages.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BASE_URL_API } from "../utils/data";

interface ILocationState {
  fromForgot?: boolean;
}

const ResetPassword: FC = () => {
  const [password, setPassword] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fromForgot = (location.state as ILocationState)?.fromForgot;
    if (!fromForgot) {
      navigate("/forgot-password");
    }
  }, [location, navigate]);

  const throwPassword = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL_API}password-reset/reset`, {
        method: "POST",
        body: JSON.stringify({ password: password, token: token }),
      });

      if (response.ok) {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setPassword("");
      setToken("");
    }
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

import React, { FC, FormEvent, useState } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./pages.module.css";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { BASE_URL_API } from "../utils/data";

interface IResponseData {
  success: boolean;
  message: string;
}

interface ILocationState {
  fromForgot: boolean;
}

const ForgotPassword: FC = () => {
  const [email, setEmail] = useState<string>("");
  const navigate: NavigateFunction = useNavigate();

  const restorePassword = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL_API}password-reset`, {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        const data: IResponseData = await response.json();
        if (data.success) {
          navigate("/reset-password", {
            state: { fromForgot: true } as ILocationState,
          });
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setEmail("");
    }
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

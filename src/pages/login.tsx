import React, { FC, FormEvent, useState } from "react";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./pages.module.css";
import { Link } from "react-router-dom";
import { useAuthMutation } from "../services/safety/auth-slice";
import { login } from "../services/safety/user";
import { IFetchResponse } from "../utils/types";
import { useAppDispatch } from "../services/hooks/redux";

const LoginPage: FC = () => {
  const [mail, setMail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useAppDispatch();

  const [auth, { isLoading, isSuccess, isError }] = useAuthMutation();

  const handleAuth = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const response = await auth({ email: mail, password: password });
      if ("data" in response) {
        const { data } = response as { data: IFetchResponse };
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        dispatch(login(data));
      }
    } catch (err) {
      console.error(err);
    }
    setMail("");
    setPassword("");
  };

  return (
    <div className={styles.container}>
      <form className={styles.container__inner} onSubmit={handleAuth}>
        <h1 className="text text_type_main-medium">Вход</h1>
        <EmailInput
          autoComplete="email"
          onChange={(e) => setMail(e.target.value)}
          value={mail}
          name={"email"}
          isIcon={false}
        />
        <PasswordInput
          autoComplete="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name={"password"}
        />
        <div>
          {isLoading && (
            <p className="text text_type_main-default">Подождте...</p>
          )}
          {isSuccess && <p className="text text_type_main-default">Успешно!</p>}
          {isError && (
            <p className="text text_type_main-default">
              Произошла ошибка, попробуйте повторить позже
            </p>
          )}
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            extraClass="ml-2"
          >
            Войти
          </Button>
        </div>
        <div className="text text_type_main-default text_color_inactive">
          <p>
            Вы - новый пользователь?
            <Link to={"/register"} className={styles.link}>
              {" "}
              Зарегистрироваться
            </Link>
          </p>
          <p>
            Забыли пароль?
            <Link to={"/forgot-password"} className={styles.link}>
              {" "}
              Восстановить пароль
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export { LoginPage };

import React, { FC, FormEvent, useState } from "react";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./pages.module.css";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../services/safety/register-slice";
import { IFetchResponse } from "../utils/types";

const RegisterPage: FC = () => {
  const [name, setName] = useState<string>("");
  const [mail, setMail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [register, { isLoading, isSuccess, isError }] = useRegisterMutation();
  const navigate: NavigateFunction = useNavigate();

  const handleRegister = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const response = await register({
        email: mail,
        password: password,
        name: name,
      });
      if ("data" in response) {
        const { data } = response as { data: IFetchResponse };
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        setName("");
        setMail("");
        setPassword("");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.container__inner} onSubmit={handleRegister}>
        <h1 className="text text_type_main-medium">Регистрация</h1>
        <Input
          autoComplete="current-name"
          placeholder={"Имя"}
          onChange={(e) => setName(e.target.value)}
          value={name}
          name={"name"}
        />
        <EmailInput
          autoComplete="current-mail"
          onChange={(e) => setMail(e.target.value)}
          value={mail}
          name={"email"}
          isIcon={false}
        />
        <PasswordInput
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name={"password"}
        />
        <div>
          {isLoading && (
            <p className="text text_type_main-default">Подождте...</p>
          )}
          {isSuccess && (
            <p className="text text_type_main-default">
              Вы успешно зарегистрировались!
            </p>
          )}
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
            Зарегистрироваться
          </Button>
        </div>
        <div className="text text_type_main-default text_color_inactive">
          <p>
            Уже зарегистрированы?
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

export { RegisterPage };

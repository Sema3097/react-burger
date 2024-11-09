import React, { FC, FormEvent, useEffect, useState } from "react";
import styles from "./profile-styles.module.css";
import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { UPDATE_DATA_USER } from "../../utils/data";
import { getUser } from "../../utils/api";
import { refreshToken } from "../../utils/api";
import { checkResponse } from "../../utils/api";


interface IInitialData {
  name: string;
  mail: string;
}

const ChangeDataForm: FC = () => {
  const [name, setName] = useState<string>("");
  const [mail, setMail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [initialData, setInitialData] = useState<IInitialData>({
    name: "",
    mail: "",
  });

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUser();
          setName(data.user.name);
          setMail(data.user.email);
          setInitialData({ name: data.user.name, mail: data.user.email });
      } catch (err) {
        if (typeof err === "object" && err !== null && "message" in err) {
          const errorMessage = (err as { message: string }).message;
          if (errorMessage === "jwt expired") {
            await refreshToken();
            fetchData();
          } else {
            console.error(err);
          }
        }
      }
    };
    fetchData();
  }, [token]);

  const changeDataAuth = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      await fetch(UPDATE_DATA_USER, {
        method: "PATCH",
        headers: {
          Authorization: token || "",
        },
        body: JSON.stringify({ name, mail, password }),
      }).then(checkResponse);
      const updatedData = await getUser();
      setName(updatedData.user.name);
      setMail(updatedData.user.email);
    } catch (err) {
      if (typeof err === "object" && err !== null && "message" in err) {
        const errorMessage = (err as { message: string }).message;
        if (errorMessage === "jwt expired") {
          await refreshToken();
          changeDataAuth(e);
        } else {
          console.error(err);
        }
      }
    }
  };

  const hanldeCancel = (): void => {
    setName(initialData.name);
    setMail(initialData.mail);
    setPassword("");
  };

  return (
    <main>
      <form className={styles.profile__form} onSubmit={changeDataAuth}>
        <Input
          placeholder="Имя"
          autoComplete="username"
          onChange={(e) => setName(e.target.value)}
          value={name}
          name={"name"}
          icon="EditIcon"
        />
        <Input
          autoComplete="login"
          placeholder="Логин"
          onChange={(e) => setMail(e.target.value)}
          value={mail}
          name={"mail"}
          icon="EditIcon"
        />
        <PasswordInput
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name={"password"}
          icon="EditIcon"
        />
        {password && name && mail ? (
          <div className={styles.profile__form_button}>
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              extraClass="ml-2"
            >
              Сохранить
            </Button>
            <Button
              htmlType="button"
              onClick={hanldeCancel}
              type="primary"
              size="large"
              extraClass="ml-2"
            >
              Отменить
            </Button>
          </div>
        ) : null}
      </form>
    </main>
  );
};

export { ChangeDataForm };

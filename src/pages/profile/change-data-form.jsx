import React, { useEffect, useState } from "react";
import styles from "./profile-styles.module.css";
import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { UPDATE_DATA_USER } from "../../utils/data";

const ChangeDataForm = () => {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    fetch(UPDATE_DATA_USER, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error");
        }
        return res.json();
      })
      .then((data) => {
        setName(data.user.name);
        setMail(data.user.email);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [token]);

  const changeDataAuth = async (e) => {
    e.preventDefault();

    fetch(UPDATE_DATA_USER, {
      method: "PATCH",
      headers: {
        Authorization: token,
      },
      body: JSON.stringify({ name: name, mail: mail, password: password }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error");
        }
        return res.json();
      })
      .then((data) => {
        setName(data.user.name);
        setMail(data.user.email);
      })
      .catch((err) => {
        console.error(err);
      });
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
              htmlType="submit"
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

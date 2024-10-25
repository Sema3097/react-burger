import React, { useEffect } from "react";
import styles from "./preloader.module.css";
import { useDispatch } from "react-redux";
import { getUser, refreshToken } from "../../../utils/api";
import { setUser } from "../../../services/safety/user";

const Preloader = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      if (localStorage.getItem("accessToken")) {
        try {
          const user = await getUser();
          dispatch(setUser(user));
        } catch (err) {
          if (err.message === "jwt expired") {
            await refreshToken();
            fetchUser();
          }
        }
      }
    };
    fetchUser();
  }, [dispatch]);

  return (
    <div className={styles.preloader_container}>
      <h1 className="text text_type_main-medium">
        Подождите, ваш заказ выполняется...
      </h1>
      <div className={styles.loader}></div>
    </div>
  );
};

export { Preloader };

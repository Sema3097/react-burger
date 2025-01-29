import React, { FC, useEffect } from "react";
import styles from "./preloader.module.css";
import { getUser, refreshToken } from "../../../utils/api";
import { setUser } from "../../../services/safety/user";
import { IFetchResponse } from "../../../utils/types";
import { useAppDispatch } from "../../../services/hooks/redux";

const Preloader: FC = () => {
  const dispatch = useAppDispatch();

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchUser = async (): Promise<void> => {
      if (token) {
        try {
          const user: IFetchResponse = await getUser();
          dispatch(setUser(user));
        } catch (err) {
          if (typeof err === "object" && err !== null && "message" in err) {
            const errorMessage = (err as { message: string }).message;
            if (errorMessage === "jwt expired") {
              await refreshToken();
              fetchUser();
            } else {
              console.error(err)
            }
          }
        }
      }
    };
    fetchUser();
  }, [dispatch, token]);

  return (
    <div className={styles.preloader_container} data-test='preloader_container'>
      <h1 className="text text_type_main-medium">
        Подождите, ваш заказ выполняется...
      </h1>
      <div className={styles.loader}></div>
    </div>
  );
};

export { Preloader };

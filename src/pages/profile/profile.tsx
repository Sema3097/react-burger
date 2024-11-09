import React, { FC } from "react";
import styles from "./profile-styles.module.css";
import { NavLink } from "react-router-dom";
import { useLogoutMutation } from "../../services/safety/logout-slice";
import { useDispatch } from "react-redux";
import { logout } from "../../services/safety/user";

const Profile: FC = () => {
  const [handOverToken] = useLogoutMutation();
  const dispatch = useDispatch();

  const handleLogout = async (): Promise<void> => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      await handOverToken({ token: refreshToken });
      dispatch(logout());
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <aside className={styles.aside}>
      <nav>
        <ul>
          <li className={styles.profile__item}>
            <NavLink
              to={"/profile"}
              end
              className={({ isActive }) =>
                `${"text text_type_main-medium text_color_inactive"}
                  ${isActive ? styles.activeLink : styles.link}`
              }
            >
              Профиль
            </NavLink>
          </li>
          <li className={styles.profile__item}>
            <NavLink
              to="orders"
              className={({ isActive }) =>
                `${"text text_type_main-medium text_color_inactive"}
                  ${isActive ? styles.activeLink : styles.link}`
              }
            >
              История заказов
            </NavLink>
          </li>
          <li className={styles.profile__item}>
            <NavLink
              to={"/"}
              onClick={handleLogout}
              className="text text_type_main-medium text_color_inactive"
            >
              Выход
            </NavLink>
          </li>
        </ul>
      </nav>
      <p
        className={`${styles.aside_text} text text_type_main-default text_color_inactive`}
      >
        В этом разделе вы можете <br /> изменить свои персональные данные
      </p>
    </aside>
  );
};

export { Profile };

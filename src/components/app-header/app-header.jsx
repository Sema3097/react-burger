import React from "react";
import styles from "./app-header-styles.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav className={styles.menu}>
          <div className={styles.burgericon}>
            <BurgerIcon type="primary" />
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${"text text_type_main-default"}
                ${isActive ? styles.activeLink : styles.link}`
              }
            >
              Конструктор
            </NavLink>
          </div>

          <div className={styles.listicon}>
            <ListIcon type="secondary" />

            <NavLink
              to={"/"}
              className={`${styles.link} text text_type_main-default`}
            >
              Лента заказов
            </NavLink>
          </div>
        </nav>

        <div className={styles.logos}>
          <Logo />

          <div className={styles.profileicon}>
            <ProfileIcon type="secondary" />
            <NavLink
              to={"/profile"}
              className={({ isActive }) =>
                `${"text text_type_main-default"}
                ${isActive ? styles.activeLink : styles.link}`
              }
            >
              Личный кабинет
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};

export { AppHeader };

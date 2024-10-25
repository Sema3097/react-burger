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
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${"text text_type_main-default"}
                ${isActive ? styles.activeLink : styles.link}`
              }
            >
              {({ isActive }) => (
                <>
                  <BurgerIcon type={isActive ? "primary" : "secondary"} />
                  <p>Конструктор</p>
                </>
              )}
            </NavLink>
          </div>

          <div className={styles.listicon}>
            <NavLink
              to={"/order-feed"}
              className={({ isActive }) =>
                `${"text text_type_main-default"}
                ${isActive ? styles.activeLink : styles.link}`
              }
            >
              {({ isActive }) => (
                <>
                  <ListIcon type={isActive ? "primary" : "secondary"} />
                  <p>Лента заказов</p>
                </>
              )}
            </NavLink>
          </div>
        </nav>

        <div className={styles.logos}>
          <Logo />

          <div className={styles.profileicon}>
            <NavLink
              to={"/profile"}
              className={({ isActive }) =>
                `${"text text_type_main-default"}
                ${isActive ? styles.activeLink : styles.link}`
              }
            >
              {({ isActive }) => (
                <>
                  <ProfileIcon type={isActive ? "primary" : "secondary"} />
                  <p>Личный кабинет</p>
                </>
              )}
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};

export { AppHeader };

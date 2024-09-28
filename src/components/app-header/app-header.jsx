import React from "react";
import styles from "./app-header-styles.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav className={styles.menu}>
          <div className={styles.burgericon}>
            <BurgerIcon type="primary" />
            <a href="/" className="text text_type_main-default">
              Конструктор
            </a>
          </div>

          <div className={styles.listicon}>
            <ListIcon type="secondary" />

            <a href="/" className={`${styles.link} text text_type_main-default`}>
              Лента заказов
            </a>
          </div>
        </nav>

        <div className={styles.logos}>
          <Logo />

          <div className={styles.profileicon}>
            <ProfileIcon type="secondary" />
            <a href="/" className={`${styles.link} text text_type_main-default`}>
              Личный кабинет
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export { AppHeader };

import React, { FC } from "react";
import styles from "./profile-styles.module.css";
import { Profile } from "./profile";
import { Outlet, useLocation } from "react-router-dom";

const LayoutProfile: FC = () => {
  const location = useLocation();
  const isOrderPage = location.pathname.startsWith("/profile/orders/");

  return (
    <div className={styles.container}>
      {!isOrderPage && <Profile />}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export { LayoutProfile };

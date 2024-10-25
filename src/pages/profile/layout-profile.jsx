import React from "react";
import styles from "./profile-styles.module.css";
import { Profile } from "./profile";
import { Outlet } from "react-router-dom";

const LayoutProfile = () => {
  return (
    <div className={styles.container}>
      <Profile />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export { LayoutProfile };

import React, { FC } from "react";
import { AppHeader } from "./app-header";
import { Outlet } from "react-router-dom";

const LayoutHeader: FC = () => {
  return (
    <div>
      <AppHeader />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export { LayoutHeader };

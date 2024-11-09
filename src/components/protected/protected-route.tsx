import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { getUser, getIsAuthChecked } from "../../services/safety/user";
import { IUserAuth } from "../../utils/types";

interface IProtected {
  onlyUnAuth: boolean;
  component: React.ReactElement;
}

const Protected: FC<IProtected> = ({ onlyUnAuth = false, component }) => {
  const user: IUserAuth | null = useSelector(getUser);
  const isAuthChecked: boolean = useSelector(getIsAuthChecked);
  const location = useLocation();

  if (!isAuthChecked) {
    return <p>Загрузка...</p>;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  return component;
};

export const OnlyAuth: React.FC<IProtected> = ({ component }) => (
  <Protected onlyUnAuth={false} component={component} />
);
export const OnlyUnAuth: React.FC<IProtected> = ({ component }) => (
  <Protected onlyUnAuth={true} component={component} />
);

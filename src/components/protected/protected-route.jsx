import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { getUser, getIsAuthChecked } from "../../services/safety/user";
import PropTypes from "prop-types";

const Protected = ({ onlyUnAuth = false, component }) => {
  const user = useSelector(getUser);
  const isAuthChecked = useSelector(getIsAuthChecked);
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

Protected.propTypes = {
  onlyUnAuth: PropTypes.bool,
  component: PropTypes.element.isRequired
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }) => (
  <Protected onlyUnAuth={true} component={component} />
);

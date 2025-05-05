import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { rootState } from "../redux/store";

interface WithAuthProps {
  component: React.ComponentType;
}

const WithAuth: React.FC<WithAuthProps> = ({ component: Component }) => {
  const userInfo = useSelector((state: rootState) => state.user.userData);
  return userInfo ? <Component /> : <Navigate to="/login" />;
};

export default WithAuth;



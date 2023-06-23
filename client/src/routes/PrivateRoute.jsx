import React from "react";
import { Navigate } from "react-router-dom";

import useAuthStore from "../store/authStore";

const PrivateRoute = ({ children }) => {
  const { auth } = useAuthStore((state) => state);

  return auth ? <>{children}</> : <Navigate to="/student/auth" />;
};

export default PrivateRoute;

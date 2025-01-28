import {Navigate, Outlet} from "react-router";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

function PrivateRoute() {
  const isAuthenticated = useIsAuthenticated()

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}

export default PrivateRoute;

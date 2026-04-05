import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";

export function PrivateRoute() {
  const { userEntity, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>;
  } else {
    return userEntity ? <Outlet /> : <Navigate to="/login" replace />;
  }
}

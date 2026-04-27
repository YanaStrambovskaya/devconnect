import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";

export function PrivateRoute() {
  const { currentUserEntity, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>;
  } else {
    return currentUserEntity ? <Outlet /> : <Navigate to="/login" replace />;
  }
}

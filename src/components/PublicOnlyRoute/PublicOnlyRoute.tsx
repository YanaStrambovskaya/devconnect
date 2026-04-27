import { useAuth } from "../../contexts/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export function PublicOnlyRoute() {
  const { currentUserEntity, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>;
  } else {
    return currentUserEntity ? <Navigate to="/profile" replace /> : <Outlet />;
  }
}

import { useAuth } from "../../contexts/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export function PublicOnlyRoute() {
  const { currentUser, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>;
  } else {
    return currentUser ? <Navigate to="/profile" replace /> : <Outlet />;
  }
}

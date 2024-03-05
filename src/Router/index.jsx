import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/Auth";

// eslint-disable-next-line react/prop-types
export default function ProtectedRoute({ redirectTo }) {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to={redirectTo} />;
}

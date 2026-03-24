import { Navigate } from "react-router-dom";
import auth from "./auth.mjs";

function ProtectedRoute({ children, adminOnly = false }) {
  if (!auth.isAuthenticated()) {
    return <Navigate to="/signin" replace />;
  }

  const user = auth.getUser();
  if (adminOnly && user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;

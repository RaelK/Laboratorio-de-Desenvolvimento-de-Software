import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function EmpresaPrivateRoute({ children }: any) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (user.tipoUsuario !== "EMPRESA") return <Navigate to="/" replace />;

  return children;
}
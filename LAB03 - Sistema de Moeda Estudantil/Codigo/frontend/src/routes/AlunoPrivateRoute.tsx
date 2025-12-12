import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function AlunoPrivateRoute({ children }: any) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (user.tipoUsuario !== "ALUNO") return <Navigate to="/" replace />;

  return children;
}
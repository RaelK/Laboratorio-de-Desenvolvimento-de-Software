import "./NavBar.css";
import { useAuth } from "../../contexts/AuthContext";

export default function NavBarProfessor() {
  const { usuario, logout } = useAuth();

  return (
    <header className="navbar-container">
      <div className="navbar-left">
        <h2 className="navbar-logo">Sistema de Mérito Estudantil</h2>
      </div>

      <div className="navbar-right">
        <div className="navbar-user">
          <span className="navbar-username">{usuario?.nome}</span>

          <div className="navbar-menu">
            <a href="/professores/painel">Painel</a>
            <a href="/professores/extrato">Extrato</a>
            <button onClick={logout}>Sair</button>
          </div>
        </div>
      </div>
    </header>
  );
}
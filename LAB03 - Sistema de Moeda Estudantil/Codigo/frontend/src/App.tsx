import {
  NavLink,
  Route,
  Routes,
  Link,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import { useAuth } from "./contexts/AuthContext";

/* ALUNO */
import StudentsForm from "./pages/students/StudentsForm";
import StudentProfile from "./pages/students/StudentProfile";
import StudentStatement from "./pages/students/StudentStatement";
import VantagensPage from "./pages/VantagensPage";

/* EMPRESA */
import CompaniesForm from "./pages/companies/CompaniesForm";
import EnviarMoedasPage from "./pages/companies/EnviarMoedasPage";
import CompanyVantagensList from "./pages/companies/CompanyVantagensList";
import CompanyVantagensForm from "./pages/companies/CompanyVantagensForm";

/* PROFESSOR */
import ProfessorPanel from "./pages/professors/ProfessorPanel";
import ProfessorProfile from "./pages/professors/ProfessorProfile";

/* HISTÓRICO */
import HistoricoResgatesPage from "./pages/HistoricoResgatesPage";

/* AUTENTICAÇÃO */
import LoginPage from "./pages/LoginPage";
import CadastroPage from "./pages/CadastroPage";

/* ROTAS PRIVADAS */
import { AlunoPrivateRoute } from "./routes/AlunoPrivateRoute";
import { ProfessorPrivateRoute } from "./routes/ProfessorPrivateRoute";
import { EmpresaPrivateRoute } from "./routes/EmpresaPrivateRoute";

import { FaCoins } from "react-icons/fa";

export default function App() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const hideHeader =
    location.pathname === "/login" || location.pathname === "/cadastro";

  /* Redirecionamento após login */
  function HomeRedirect() {
    if (!user) return <Navigate to="/login" replace />;

    if (user.tipoUsuario === "ALUNO")
      return <Navigate to="/alunos/vantagens" replace />;
    if (user.tipoUsuario === "PROFESSOR")
      return <Navigate to="/professores/painel" replace />;
    if (user.tipoUsuario === "EMPRESA")
      return <Navigate to="/empresas/enviar" replace />;

    return <Navigate to="/login" replace />;
  }

  /* Menu estilizado */
  function menuButton(path: string, label: string) {
    return (
      <NavLink
        to={path}
        className={({ isActive }) =>
          `btn ${isActive
            ? "bg-white text-brand-900 font-bold"
            : "bg-brand-900 text-white"
          }`
        }
      >
        {label}
      </NavLink>
    );
  }

  /* Menus do Header */
  function renderMenu() {
    if (!user) return null;

    switch (user.tipoUsuario) {
      case "ALUNO":
        return (
          <>
            {menuButton("/alunos/vantagens", "Loja de Vantagens")}
            {menuButton(`/alunos/${user.idUser}/carteira`, "Carteirinha")}
            {menuButton(`/alunos/${user.idUser}/extrato`, "Extrato")}
          </>
        );

      case "PROFESSOR":
        return (
          <>
            {menuButton("/professores/painel", "Painel")}
            {menuButton(`/professores/${user.idUser}/carteira`, "Carteirinha")}
          </>
        );

      case "EMPRESA":
        return (
          <>
            {menuButton("/empresas/enviar", "Enviar Moedas")}
            {menuButton("/empresas/vantagens", "Vantagens")}
            {menuButton("/empresas/vantagens/nova", "Cadastrar Vantagem")}
          </>
        );

      default:
        return null;
    }
  }

  /* Dropdown usuário */
  function renderDropdown() {
    if (!user) return null;

    let perfilRoute = "";
    if (user.tipoUsuario === "ALUNO")
      perfilRoute = `/alunos/${user.idUser}`;
    else if (user.tipoUsuario === "PROFESSOR")
      perfilRoute = `/professores/${user.idUser}/carteira`;
    else if (user.tipoUsuario === "EMPRESA")
      perfilRoute = `/empresas/${user.idUser}`;

    return (
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="btn bg-brand-800 border-white/20 px-4 py-2 text-white"
        >
          {user.nome}
        </button>

        {dropdownOpen && (
          <div className="dropdown-pill absolute right-0 mt-2">
            <NavLink to={perfilRoute} onClick={() => setDropdownOpen(false)}>
              Editar Perfil
            </NavLink>

            <button onClick={logout} className="text-red-400 px-4 py-2">
              Sair
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      {!hideHeader && (
        <header className="sticky top-0 z-20 bg-[#0B132B]/75 border-b border-white/10 backdrop-blur">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-brand-500 flex items-center justify-center shadow-lg">
                <FaCoins className="text-2xl text-yellow-300" />
              </div>
              <div>
                <div className="font-bold text-lg text-white flex items-center gap-1">
                  bit <span className="text-coin">Student</span>
                </div>
                <div className="text-xs text-white/60 -mt-1">
                  Mérito estudantil em moedas virtuais
                </div>
              </div>
            </Link>

            <nav className="flex items-center gap-4">
              {user && renderMenu()}
              {user && renderDropdown()}
            </nav>
          </div>
        </header>
      )}

      <main className="max-w-7xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<HomeRedirect />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<CadastroPage />} />

          {/* Aluno */}
          <Route
            path="/alunos/vantagens"
            element={
              <AlunoPrivateRoute>
                <VantagensPage />
              </AlunoPrivateRoute>
            }
          />
          <Route
            path="/alunos/:id/carteira"
            element={
              <AlunoPrivateRoute>
                <StudentProfile />
              </AlunoPrivateRoute>
            }
          />
          <Route
            path="/alunos/:id/extrato"
            element={
              <AlunoPrivateRoute>
                <StudentStatement />
              </AlunoPrivateRoute>
            }
          />
          <Route
            path="/alunos/:id"
            element={
              <AlunoPrivateRoute>
                <StudentsForm />
              </AlunoPrivateRoute>
            }
          />

          {/* Professor */}
          <Route
            path="/professores/painel"
            element={
              <ProfessorPrivateRoute>
                <ProfessorPanel />
              </ProfessorPrivateRoute>
            }
          />
          <Route
            path="/professores/:id/carteira"
            element={
              <ProfessorPrivateRoute>
                <ProfessorProfile />
              </ProfessorPrivateRoute>
            }
          />

          {/* Empresa */}
          <Route
            path="/empresas/enviar"
            element={
              <EmpresaPrivateRoute>
                <EnviarMoedasPage />
              </EmpresaPrivateRoute>
            }
          />

          {/* Empresa: Perfil */}
          <Route
            path="/empresas/:id"
            element={
              <EmpresaPrivateRoute>
                <CompaniesForm />
              </EmpresaPrivateRoute>
            }
          />

          {/* Empresa: Vantagens */}
          <Route
            path="/empresas/vantagens"
            element={
              <EmpresaPrivateRoute>
                <CompanyVantagensList />
              </EmpresaPrivateRoute>
            }
          />

          <Route
            path="/empresas/vantagens/nova"
            element={
              <EmpresaPrivateRoute>
                <CompanyVantagensForm />
              </EmpresaPrivateRoute>
            }
          />

          <Route
            path="/empresas/vantagens/:id"
            element={
              <EmpresaPrivateRoute>
                <CompanyVantagensForm />
              </EmpresaPrivateRoute>
            }
          />

          <Route path="/historico" element={<HistoricoResgatesPage />} />
        </Routes>
      </main>
    </div>
  );
}
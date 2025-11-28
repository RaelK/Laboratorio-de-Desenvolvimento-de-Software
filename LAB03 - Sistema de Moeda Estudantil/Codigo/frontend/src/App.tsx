import { NavLink, Route, Routes, Link, useLocation } from 'react-router-dom'
import StudentsList from './pages/students/StudentsList'
import StudentsForm from './pages/students/StudentsForm'
import StudentProfile from './pages/students/StudentProfile'
import CompaniesList from './pages/companies/CompaniesList'
import CompaniesForm from './pages/companies/CompaniesForm'
import ProfessorPanel from './pages/professors/ProfessorPanel'
import StudentStatement from "./pages/students/StudentStatement"
import ProfessorProfile from "./pages/professors/ProfessorProfile"
import Login from './pages/auth/Login'
import { useAuth } from './contexts/AuthContext'

import {
  FaCoins,
  FaSchool,
  FaUserGraduate,
  FaBuilding,
  FaChalkboardTeacher,
  FaListAlt,
  FaSignOutAlt
} from 'react-icons/fa'

export default function App() {
  // Usado para saber se estamos na página inicial
  const location = useLocation()
  const isHome = location.pathname === "/"
  const { user, logout, isAuthenticated } = useAuth()

  return (
    <div>

      {/* -------------------------------- HEADER -------------------------------- */}
      <header className="sticky top-0 z-20 backdrop-blur bg-[#0B132B]/75 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4 justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-lg">
              <FaCoins className="text-2xl text-yellow-300" />
            </div>

            <div>
              <div className="font-bold text-lg tracking-tight flex items-center gap-2">
                <span className="text-white">bit</span>
                <span className="text-coin">Student</span>
              </div>
              <div className="text-xs text-white/60 -mt-0.5">
                Mérito estudantil em moedas virtuais
              </div>
            </div>
          </Link>

          <nav className="flex gap-2">
            {isAuthenticated ? (
              <>
                <NavLink to="/alunos" className={({ isActive }) => isActive ? 'btn btn-primary' : 'btn'}>
                  <FaUserGraduate /> Alunos
                </NavLink>
                <NavLink to="/empresas" className={({ isActive }) => isActive ? 'btn btn-primary' : 'btn'}>
                  <FaBuilding /> Empresas
                </NavLink>
                <NavLink to="/professores/painel" className={({ isActive }) => isActive ? 'btn btn-primary' : 'btn'}>
                  <FaChalkboardTeacher /> Professor
                </NavLink>
                <button onClick={logout} className="btn">
                  <FaSignOutAlt /> Sair
                </button>
              </>
            ) : (
              <NavLink to="/login" className={({ isActive }) => isActive ? 'btn btn-primary' : 'btn'}>
                Entrar
              </NavLink>
            )}
          </nav>
        </div>
      </header>



      {/* -------------------------------- MAIN -------------------------------- */}
      <main className="max-w-6xl mx-auto px-4 py-6 relative">

        {/* -------- VIDEO DE FUNDO EXCLUSIVO DA HOME -------- */}
        {isHome && (
          <div className="video-bg-container">
            <iframe
              className="video-bg-iframe"
              src="https://www.youtube.com/embed/HPrwv0Eqocw?autoplay=1&mute=1&loop=1&playlist=HPrwv0Eqocw&controls=0&showinfo=0&modestbranding=1&rel=0"
              title="Campus universitário"
              frameBorder="0"
              allow="autoplay; fullscreen; encrypted-media"
            />
            <div className="video-bg-overlay" />
          </div>
        )}

        {/* Conteúdo das páginas */}
        <div className={isHome ? "relative z-10" : ""}>
          <Routes>

            {/* ---------------- HOME ---------------- */}
            <Route path="/" element={
              <div className="card">
                <div className="flex items-center gap-3 text-2xl font-bold">
                  <FaSchool className="text-brand-300" />
                  <span>Bem-vindo(a) ao bitStudent</span>
                </div>

                <p className="text-white/70 mt-2">
                  Plataforma de reconhecimento do mérito estudantil com moedas virtuais.
                </p>

                <div className="mt-5 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <NavLink to="/alunos" className="btn btn-primary flex items-center justify-center gap-2">
                    <FaUserGraduate /> Gerenciar Alunos
                  </NavLink>

                  <NavLink to="/empresas" className="btn flex items-center justify-center gap-2">
                    <FaBuilding /> Gerenciar Empresas
                  </NavLink>

                  <NavLink to="/professores/painel" className="btn flex items-center justify-center gap-2">
                    <FaChalkboardTeacher /> Painel do Professor
                  </NavLink>
                </div>

                <div className="mt-8 border-t border-white/10 pt-4">
                  <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <FaListAlt className="text-coin" /> Acesso rápido
                  </h2>

                  <p className="text-white/60 text-sm">
                    Consulte o extrato de moedas ou acesse a carteirinha digital do aluno.
                  </p>

                  <div className="mt-3 flex flex-wrap gap-3">
                    <NavLink to="/alunos/1/carteira" className="btn btn-primary flex items-center gap-2">
                      <FaUserGraduate /> Carteirinha (Aluno 1)
                    </NavLink>

                    <NavLink to="/alunos/1/extrato" className="btn flex items-center gap-2">
                      <FaCoins /> Extrato (Aluno 1)
                    </NavLink>
                  </div>
                </div>
              </div>
            } />

            {/* ---------------- AUTENTICAÇÃO ---------------- */}
            <Route path="/login" element={<Login />} />

            {/* ---------------- OUTRAS PÁGINAS ---------------- */}
            <Route path="/alunos" element={<StudentsList />} />
            <Route path="/alunos/novo" element={<StudentsForm />} />
            <Route path="/alunos/:id" element={<StudentsForm />} />
            <Route path="/alunos/:id/carteira" element={<StudentProfile />} />
            <Route path="/alunos/:id/extrato" element={<StudentStatement />} />

            <Route path="/empresas" element={<CompaniesList />} />
            <Route path="/empresas/nova" element={<CompaniesForm />} />
            <Route path="/empresas/:id" element={<CompaniesForm />} />

            <Route path="/professores/painel" element={<ProfessorPanel />} />
            <Route path="/professores/:id/carteira" element={<ProfessorProfile />} />

          </Routes>
        </div>
      </main>

    </div>
  )
}
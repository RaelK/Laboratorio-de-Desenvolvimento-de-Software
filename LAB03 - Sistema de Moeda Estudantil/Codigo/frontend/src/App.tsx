import { NavLink, Route, Routes, Link } from 'react-router-dom'
import StudentsList from './pages/students/StudentsList'
import StudentsForm from './pages/students/StudentsForm'
import StudentProfile from './pages/students/StudentProfile'
import CompaniesList from './pages/companies/CompaniesList'
import CompaniesForm from './pages/companies/CompaniesForm'
import { FaCoins, FaSchool, FaUserGraduate, FaBuilding, FaChalkboardTeacher, FaListAlt } from 'react-icons/fa'
import StudentStatement from "./pages/students/StudentStatement"
import ProfessorPanel from "./pages/professors/ProfessorPanel"
import ProfessorProfile from "./pages/professors/ProfessorProfile";

export default function App() {
  return (
    <div>
      {/* ---------- CABEÇALHO ---------- */}
      <header className="sticky top-0 z-20 backdrop-blur bg-[#0B132B]/75 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4 justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-extrabold">
            <FaCoins className="text-coin" />
            <span>bitStudent</span>
          </Link>
          <nav className="flex gap-2">
            <NavLink to="/alunos" className={({ isActive }) => isActive ? 'btn btn-primary' : 'btn'}>
              <FaUserGraduate /> Alunos
            </NavLink>
            <NavLink to="/empresas" className={({ isActive }) => isActive ? 'btn btn-primary' : 'btn'}>
              <FaBuilding /> Empresas
            </NavLink>
            <NavLink to="/professores/painel" className={({ isActive }) => isActive ? 'btn btn-primary' : 'btn'}>
              <FaChalkboardTeacher /> Professor
            </NavLink>
          </nav>
        </div>
      </header>

      {/* ---------- CONTEÚDO PRINCIPAL ---------- */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        <Routes>
          {/* ---------- PÁGINA INICIAL ---------- */}
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

          <Route path="/alunos" element={<StudentsList />} />
          <Route path="/alunos/novo" element={<StudentsForm />} />
          <Route path="/alunos/:id" element={<StudentsForm />} />
          <Route path="/empresas" element={<CompaniesList />} />
          <Route path="/empresas/nova" element={<CompaniesForm />} />
          <Route path="/empresas/:id" element={<CompaniesForm />} />
          <Route path="/alunos/:id/carteira" element={<StudentProfile />} />
          <Route path="/alunos/:id/extrato" element={<StudentStatement />} />
          <Route path="/professores/painel" element={<ProfessorPanel />} />
          <Route path="/professores/:id/carteira" element={<ProfessorProfile />} />
        </Routes>
      </main>
    </div>
  )
}

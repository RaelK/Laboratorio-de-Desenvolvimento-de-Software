import { NavLink, Route, Routes, Link } from 'react-router-dom'
import StudentsList from './pages/students/StudentsList'
import StudentsForm from './pages/students/StudentsForm'
import CompaniesList from './pages/companies/CompaniesList'
import CompaniesForm from './pages/companies/CompaniesForm'
import { FaCoins, FaSchool, FaUserGraduate, FaBuilding } from 'react-icons/fa'

export default function App() {
  return (
    <div>
      <header className="sticky top-0 z-20 backdrop-blur bg-[#0B132B]/75 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4 justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-extrabold">
            <FaCoins className="text-coin" />
            <span>bitStudent</span>
          </Link>
          <nav className="flex gap-2">
            <NavLink to="/alunos" className={({isActive}) => isActive ? 'btn btn-primary' : 'btn'}>
              <FaUserGraduate/> Alunos
            </NavLink>
            <NavLink to="/empresas" className={({isActive}) => isActive ? 'btn btn-primary' : 'btn'}>
              <FaBuilding/> Empresas
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={
            <div className="card">
              <div className="flex items-center gap-3 text-2xl font-bold">
                <FaSchool className="text-brand-300"/>
                <span>Bem-vindo(a) ao bitStudent</span>
              </div>
              <p className="text-white/70 mt-2">Cadastre sua Empresa e gerencie seus alunos.</p>
              <div className="mt-4 flex gap-3">
                <NavLink to="/alunos" className="btn btn-primary">Gerenciar Alunos</NavLink>
                <NavLink to="/empresas" className="btn">Gerenciar Empresas</NavLink>
              </div>
            </div>
          }/>
          <Route path="/alunos" element={<StudentsList/>}/>
          <Route path="/alunos/novo" element={<StudentsForm/>}/>
          <Route path="/alunos/:id" element={<StudentsForm/>}/>
          <Route path="/empresas" element={<CompaniesList/>}/>
          <Route path="/empresas/nova" element={<CompaniesForm/>}/>
          <Route path="/empresas/:id" element={<CompaniesForm/>}/>
        </Routes>
      </main>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { deleteCompany, listCompanies } from '../../api/companies'
import type { EmpresaParceira } from '../../types'
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa'

export default function CompaniesList() {
  const [items, setItems] = useState<EmpresaParceira[]>([])
  const [loading, setLoading] = useState(true)
  const [q, setQ] = useState('')
  const navigate = useNavigate()

  async function load() {
    setLoading(true)
    try { setItems(await listCompanies()) } finally { setLoading(false) }
  }
  useEffect(()=>{ load() }, [])

  async function onDelete(id:number) {
    if(!confirm('Deseja remover esta empresa?')) return
    await deleteCompany(id)
    await load()
  }

  const filtered = items.filter(e => [e.nome, e.email, e.login].join(' ').toLowerCase().includes(q.toLowerCase()))

  return (
    <div className="card">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div>
          <div className="text-xl font-bold">Empresas Parceiras</div>
          <p className="text-white/60">Gerencie cadastros</p>
        </div>
        <div className="flex gap-2">
          <input className="input" placeholder="Pesquisar..." value={q} onChange={e=>setQ(e.target.value)}/>
          <Link to="/empresas/nova" className="btn btn-primary"><FaPlus/> Nova</Link>
        </div>
      </div>

      {loading ? <p>Carregando...</p> : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr><th>#</th><th>Nome</th><th>Email</th><th>Login</th><th>Ações</th></tr>
            </thead>
            <tbody>
              {filtered.map(e => (
                <tr key={e.id}>
                  <td>{e.id}</td>
                  <td>{e.nome}</td>
                  <td>{e.email}</td>
                  <td>{e.login}</td>
                  <td className="flex gap-2">
                    <button className="btn" onClick={()=>navigate(`/empresas/${e.id}`)}><FaEdit/></button>
                    <button className="btn bg-red-700 hover:bg-red-600" onClick={()=>onDelete(e.id)}><FaTrash/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length===0 && <p className="text-white/60 mt-3">Nenhuma empresa encontrada.</p>}
        </div>
      )}
    </div>
  )
}

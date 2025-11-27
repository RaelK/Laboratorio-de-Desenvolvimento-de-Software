import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { deleteStudent, listStudents } from '../../api/students'
import type { Aluno } from '../../types'
import { FaPlus, FaEdit, FaTrash, FaIdBadge } from 'react-icons/fa'

export default function StudentsList() {
  const [items, setItems] = useState<Aluno[]>([])
  const [loading, setLoading] = useState(true)
  const [q, setQ] = useState('')
  const navigate = useNavigate()

  async function load() {
    setLoading(true)
    try {
      const data = await listStudents()
      setItems(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function onDelete(id: number) {
    if (!window.confirm('Tem certeza que deseja excluir este aluno?')) return
    await deleteStudent(id)
    await load()
  }

  const filtered = items.filter((a) =>
    [a.nome, a.email, a.cpf, a.curso, a.instituicaoEnsino?.nome ?? '']
      .join(' ')
      .toLowerCase()
      .includes(q.toLowerCase())
  )

  return (
    <>
      {/* 🔹 FUNDO FIXO PARA ALUNOS */}
      <div
        className="fixed inset-0 bg-cover bg-center -z-10 brightness-60"
        style={{
          backgroundImage: "url('/images/alunosuniversitarios.jpg')"
        }}
      />

      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="card">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div>
              <div className="text-xl font-bold">Alunos</div>
              <p className="text-white/60">Gerencie cadastros e carteirinhas digitais</p>
            </div>

            <div className="flex gap-2">
              <input
                className="input"
                placeholder="Pesquisar..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
              <Link to="/alunos/novo" className="btn btn-primary">
                <FaPlus /> Novo
              </Link>
            </div>
          </div>

          {loading ? (
            <p>Carregando...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table w-full text-sm">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>CPF</th>
                    <th>Curso</th>
                    <th>Instituição</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.map((a) => (
                    <tr key={a.id} className="border-b border-white/10">
                      <td>{a.nome}</td>
                      <td>{a.email}</td>
                      <td>{a.cpf}</td>
                      <td>{a.curso}</td>
                      <td>{a.instituicaoEnsino?.nome}</td>

                      <td className="flex gap-2">
                        <button
                          className="btn"
                          onClick={() => navigate(`/alunos/${a.id}`)}
                        >
                          <FaEdit />
                        </button>

                        <Link
                          className="btn"
                          to={`/alunos/${a.id}/carteira`}
                          title="Carteirinha"
                        >
                          <FaIdBadge />
                        </Link>

                        <button
                          className="btn bg-red-700 hover:bg-red-600"
                          onClick={() => onDelete(a.id!)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filtered.length === 0 && (
                <p className="text-white/60 mt-3">Nenhum aluno encontrado.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getStudent } from "../../api/students";
import { getExtratoAluno } from "../../api/transactions";
import type { Aluno, Transacao } from "../../types";

export default function StudentStatement() {
  const { id } = useParams();
  const [aluno, setAluno] = useState<Aluno | null>(null);
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);

  useEffect(() => {
    (async () => {
      const alunoData = await getStudent(id!);
      setAluno(alunoData);

      const extrato = await getExtratoAluno(id!);
      setTransacoes(extrato);
    })();
  }, [id]);

  if (!aluno)
    return (
      <>
        <div
          className="fixed inset-0 bg-cover bg-center -z-10 brightness-60"
          style={{ backgroundImage: "url('/images/alunosuniversitarios.jpg')" }}
        />
        <div className="flex justify-center items-center min-h-screen">
          <div className="card">Carregando...</div>
        </div>
      </>
    );

  return (
    <>
      <div
        className="fixed inset-0 bg-cover bg-center -z-10 brightness-60"
        style={{ backgroundImage: "url('/images/alunosuniversitarios.jpg')" }}
      />

      <div className="flex justify-center items-center min-h-screen px-4">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-b from-cyan-700 to-cyan-600 text-white px-6 py-4">
            <h1 className="text-2xl font-bold">Extrato do Aluno</h1>
          </div>

          <div className="px-6 py-5 text-gray-800">
            <div className="grid grid-cols-2 gap-y-3">
              <div>
                <span className="text-gray-500 block text-sm">Nome</span>
                <span>{aluno.nome}</span>
              </div>

              <div>
                <span className="text-gray-500 block text-sm">Email</span>
                <span>{aluno.email}</span>
              </div>

              <div>
                <span className="text-gray-500 block text-sm">CPF</span>
                <span>{aluno.cpf}</span>
              </div>

              <div>
                <span className="text-gray-500 block text-sm">Curso</span>
                <span>{aluno.curso}</span>
              </div>

              <div>
                <span className="text-gray-500 block text-sm">Instituição</span>
                <span>{aluno.instituicaoEnsino?.nome}</span>
              </div>

              <div>
                <span className="text-gray-500 block text-sm">Saldo Atual</span>
                <span>{aluno.saldoMoedas} moedas</span>
              </div>
            </div>
          </div>

          <hr className="border-gray-300" />

          <div className="px-6 py-5">
            <h2 className="text-lg font-bold mb-3 text-gray-800">Movimentações</h2>

            {transacoes.length === 0 ? (
              <p className="text-gray-500">Nenhuma transação encontrada.</p>
            ) : (
              <ul className="space-y-3">
                {transacoes.map((t) => (
                  <li
                    key={t.id}
                    className="p-3 border border-gray-200 rounded-md shadow-sm text-sm flex justify-between items-center"
                  >
                    <div>
                      <div className="font-semibold">{t.descricao}</div>
                      <div className="text-xs text-gray-500">
                        Recebido de: {t.professor?.nome || "—"}
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(t.data).toLocaleString()}
                      </div>
                    </div>
                    <div className="font-bold text-green-600">+{t.valor}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="px-6 py-6 flex flex-col items-center gap-3">
            <Link
              to={`/alunos/${id}/carteira`}
              className="btn btn-primary w-full max-w-xs text-center"
            >
              Voltar à Carteirinha
            </Link>

            <Link to="/alunos" className="btn w-full max-w-xs text-center">
              Voltar à Lista
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
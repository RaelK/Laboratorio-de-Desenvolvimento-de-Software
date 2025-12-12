import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listStudents } from "../../api/students";
import {
  transferirMoedas,
  getExtratoProfessor,
} from "../../api/transactions";
import type { Aluno, Transacao } from "../../types";
import { useAuth } from "../../contexts/AuthContext";

// SALDO INICIAL POR SEMESTRE
const SALDO_INICIAL = 1000;

export default function ProfessorPanel() {
  const { user } = useAuth();
  const PROFESSOR_ID: number = user?.idUser ?? 0;

  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [saldo, setSaldo] = useState<number>(SALDO_INICIAL);

  const [alunoId, setAlunoId] = useState<number | "">("");
  const [valor, setValor] = useState<number>(10);
  const [descricao, setDescricao] = useState<string>("");

  const [mensagem, setMensagem] = useState<string | null>(null);
  const [tipoMensagem, setTipoMensagem] = useState<
    "sucesso" | "erro" | null
  >(null);
  const [loading, setLoading] = useState(false);

  async function carregarDados() {
    if (!PROFESSOR_ID) return;

    const lista = await listStudents();
    setAlunos(lista);

    const extrato = await getExtratoProfessor(PROFESSOR_ID);
    setTransacoes(extrato);

    // agora só soma ENVIO
    const totalEnviado = extrato
      .filter((t) => t.tipo === "ENVIO")
      .reduce((acc, t) => acc + t.valor, 0);

    setSaldo(SALDO_INICIAL - totalEnviado);
  }

  useEffect(() => {
    carregarDados();
  }, []);

  function mostrarMensagem(texto: string, tipo: "sucesso" | "erro") {
    setMensagem(texto);
    setTipoMensagem(tipo);
    setTimeout(() => {
      setMensagem(null);
      setTipoMensagem(null);
    }, 6000);
  }

  async function handleEnviar(e: React.FormEvent) {
    e.preventDefault();

    if (!PROFESSOR_ID) {
      mostrarMensagem("Erro: professor não identificado.", "erro");
      return;
    }

    if (!alunoId || alunoId === 0) {
      mostrarMensagem("Selecione um aluno válido.", "erro");
      return;
    }

    if (valor <= 0) {
      mostrarMensagem("O valor deve ser maior que zero.", "erro");
      return;
    }

    if (valor > saldo) {
      mostrarMensagem("Saldo insuficiente.", "erro");
      return;
    }

    try {
      setLoading(true);

      await transferirMoedas({
        professorId: PROFESSOR_ID,
        alunoId: Number(alunoId),
        valor,
        descricao: descricao || "Reconhecimento do professor",
      });

      mostrarMensagem(
        `🪙 Moedas enviadas com sucesso! O aluno recebeu ${valor} moedas.`,
        "sucesso"
      );

      setDescricao("");
      setValor(10);

      await carregarDados();
    } catch (err) {
      console.error(err);
      mostrarMensagem("Erro ao enviar moedas. Tente novamente.", "erro");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Fundo */}
      <div
        className="fixed inset-0 bg-cover bg-center -z-10 brightness-60"
        style={{ backgroundImage: "url('/images/professor.jpg')" }}
      />

      <div className="flex justify-center items-center min-h-screen px-4">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
          {/* TÍTULO */}
          <div className="bg-gradient-to-b from-cyan-700 to-cyan-600 text-white px-6 py-4">
            <h1 className="text-2xl font-bold">Painel do Professor</h1>
          </div>

          {/* MENSAGENS */}
          {mensagem && (
            <div
              className={`px-6 py-3 text-center text-sm font-semibold ${tipoMensagem === "sucesso"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
                }`}
            >
              {mensagem}
            </div>
          )}

          {/* FORMULÁRIO */}
          <div className="px-6 py-5 text-gray-800">
            <form onSubmit={handleEnviar} className="space-y-4">
              <div>
                <label className="block mb-1 text-sm">Aluno</label>
                <select
                  value={alunoId}
                  onChange={(e) => setAlunoId(Number(e.target.value))}
                  className="w-full border rounded-lg px-3 py-2 bg-white"
                >
                  <option value="">Selecione um aluno</option>
                  {alunos.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm">Valor</label>
                  <input
                    type="number"
                    min={1}
                    value={valor}
                    onChange={(e) => setValor(Number(e.target.value))}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm">Descrição</label>
                  <input
                    type="text"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Enviando..." : "Enviar Moedas"}
              </button>
            </form>
          </div>

          {/* EXTRATO */}
          <hr />

          <div className="px-6 py-5">
            <h2 className="text-lg font-bold mb-3 text-gray-800">
              Histórico de Movimentações
            </h2>

            {transacoes.length === 0 ? (
              <p className="text-gray-500">Nenhuma transação encontrada.</p>
            ) : (
              <ul className="space-y-3">
                {transacoes.map((t) => (
                  <li
                    key={t.id}
                    className="p-3 border rounded-md shadow-sm text-sm flex justify-between items-center"
                  >
                    <div>
                      <div className="font-semibold">{t.descricao}</div>

                      {t.tipo === "ENVIO" ? (
                        <div className="text-xs text-gray-500">
                          Enviado para: {t.aluno?.nome}
                        </div>
                      ) : (
                        <div className="text-xs text-red-500">
                          Resgate realizado pelo aluno: {t.aluno?.nome}
                        </div>
                      )}

                      <div className="text-xs text-gray-400">
                        {new Date(t.data).toLocaleString()}
                      </div>
                    </div>

                    <div
                      className={`font-bold ${t.tipo === "ENVIO" ? "text-red-600" : "text-blue-600"
                        }`}
                    >
                      {t.tipo === "ENVIO" ? "-" : "-"}{t.valor}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="px-6 py-6 flex flex-col items-center gap-3">
            <Link to="/" className="btn w-full max-w-xs text-center">
              Voltar ao Início
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
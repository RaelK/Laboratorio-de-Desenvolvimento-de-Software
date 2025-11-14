import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { listStudents } from "../../api/students";
import { transferirMoedas, getExtratoProfessor } from "../../api/transactions";
import type { Aluno, Transacao } from "../../types";

const PROFESSOR_ID_PADRAO = 1;
const SALDO_INICIAL = 1000; // saldo fixo do semestre

export default function ProfessorPanel() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [saldo, setSaldo] = useState<number>(SALDO_INICIAL);
  const [alunoId, setAlunoId] = useState<number | "">("");
  const [valor, setValor] = useState<number>(10);
  const [descricao, setDescricao] = useState<string>("");
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [tipoMensagem, setTipoMensagem] = useState<"sucesso" | "erro" | null>(null);
  const [animarMoedas, setAnimarMoedas] = useState(false);

  async function carregarExtrato() {
    try {
      const extrato = await getExtratoProfessor(PROFESSOR_ID_PADRAO);
      setTransacoes(extrato);
    } catch {
      setTransacoes([]);
    }
  }

  // 🔹 Carrega alunos e extrato ao iniciar
  useEffect(() => {
    (async () => {
      const lista = await listStudents();
      console.log("DEBUG alunos:", lista);
      setAlunos(lista);
      if (lista.length === 1) setAlunoId(lista[0].id);
      await carregarExtrato();
    })();
  }, []);

  async function handleEnviar(e: React.FormEvent) {
    e.preventDefault();

    if (!alunoId || alunoId === 0 || Number.isNaN(alunoId)) {
      setTipoMensagem("erro");
      setMensagem("Selecione um aluno válido antes de enviar moedas.");
      return;
    }

    if (valor <= 0) {
      setTipoMensagem("erro");
      setMensagem("O valor deve ser maior que zero.");
      return;
    }

    if (valor > saldo) {
      setTipoMensagem("erro");
      setMensagem("Saldo insuficiente. Reduza o valor ou aguarde novo semestre.");
      return;
    }

    try {
      console.log("DEBUG envio:", {
        professorId: PROFESSOR_ID_PADRAO,
        alunoId,
        valor,
        descricao,
      });

      await transferirMoedas({
        professorId: PROFESSOR_ID_PADRAO,
        alunoId: Number(alunoId),
        valor,
        descricao: descricao || "Reconhecimento de mérito",
      });

      // Atualiza saldo e estado local
      setSaldo((s) => s - valor);
      setDescricao("");
      setValor(10);
      await carregarExtrato();

      // 🔔 Mensagem e animação de sucesso
      setTipoMensagem("sucesso");
      setMensagem(
        "💰 Moedas enviadas com sucesso! Um e-mail de confirmação foi encaminhado ao aluno e uma cópia enviada para você."
      );
      setAnimarMoedas(true);
      setTimeout(() => setAnimarMoedas(false), 3000);
    } catch (error) {
      console.error("Erro ao enviar moedas:", error);
      setTipoMensagem("erro");
      setMensagem("❌ Não foi possível enviar moedas. Tente novamente mais tarde.");
    }

    setTimeout(() => setMensagem(null), 4500);
  }

  return (
    <div className="relative max-w-5xl mx-auto grid md:grid-cols-2 gap-6 mt-8">
      {/* 🔹 Mensagem global */}
      <AnimatePresence>
        {mensagem && (
          <motion.div
            key="mensagem"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className={`absolute top-0 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-xl text-center text-xl font-semibold shadow-md ${
              tipoMensagem === "sucesso"
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            }`}
            style={{ zIndex: 1000, width: "80%" }}
          >
            {mensagem}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 💰 Animação de moedas */}
      <AnimatePresence>
        {animarMoedas &&
          [...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                opacity: 1,
                y: -40,
                x: Math.random() * 400 - 200,
                rotate: Math.random() * 360,
              }}
              animate={{ y: 500, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.8, delay: i * 0.1 }}
              className="absolute text-yellow-400 text-3xl select-none"
              style={{
                top: "60px",
                left: "50%",
                transform: `translateX(${Math.random() * 300 - 150}px)`,
              }}
            >
              💰
            </motion.div>
          ))}
      </AnimatePresence>

      {/* 🧾 Formulário */}
      <div className="card mt-20 md:mt-0">
        <div className="text-2xl font-bold mb-4 text-center">Enviar Moedas</div>

        <div className="text-center text-lg mb-3">
          <span className="text-white/70">Saldo atual: </span>
          <span className="text-yellow-400 font-bold">{saldo}</span> 🪙
        </div>

        <form onSubmit={handleEnviar} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm text-white/70">Aluno</label>
            <select
              value={alunoId}
              onChange={(e) => setAlunoId(Number(e.target.value))}
              className="bg-[#1C2541] rounded px-3 py-2 w-full"
            >
              <option value="">Selecione um aluno</option>
              {alunos.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.nome}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm text-white/70">Valor</label>
            <input
              type="number"
              min={1}
              value={valor}
              onChange={(e) => setValor(Number(e.target.value))}
              className="bg-[#1C2541] rounded px-3 py-2 w-full"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-white/70">Motivo</label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Ex: excelente participação em aula"
              className="bg-[#1C2541] rounded px-3 py-2 w-full"
            />
          </div>

          <button className="btn btn-primary w-full font-semibold">
            Enviar Moedas
          </button>
        </form>

        <div className="mt-6 flex justify-center">
          <Link to="/" className="btn">
            Voltar ao Início
          </Link>
        </div>
      </div>

      {/* 🧾 Extrato */}
      <div className="card">
        <div className="text-2xl font-bold mb-4 text-center">
          Extrato de Envios
        </div>

        {transacoes.length === 0 ? (
          <p className="text-center">Nenhuma transação encontrada.</p>
        ) : (
          <ul className="space-y-3">
            {transacoes.map((t) => (
              <li
                key={t.id}
                className="border border-white/10 rounded-lg p-3 flex justify-between items-center"
              >
                <div>
                  <div className="font-semibold">{t.descricao}</div>
                  <div className="text-sm text-white/60">
                    Enviado para: {t.aluno?.nome || "—"}
                  </div>
                  <div className="text-xs text-white/40">
                    {new Date(t.data).toLocaleString()}
                  </div>
                </div>
                <div className="text-red-400 font-bold">-{t.valor}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
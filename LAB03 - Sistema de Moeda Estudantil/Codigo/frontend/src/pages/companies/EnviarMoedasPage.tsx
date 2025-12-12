import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

type Professor = {
  idUser: number;
  nome: string;
  email: string;
};

export default function EnviarMoedasPage() {
  const { user } = useAuth();
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [quantidade, setQuantidade] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  // NOVO — mensagem estilizada
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    async function carregarProfessores() {
      try {
        const res = await fetch("http://localhost:8080/professores");
        const data = await res.json();
        setProfessores(data);
      } finally {
        setLoading(false);
      }
    }
    carregarProfessores();
  }, []);

  async function enviar(idProfessor: number) {
    if (quantidade <= 0) {
      setMensagem("Informe uma quantidade válida.");
      setTimeout(() => setMensagem(""), 3000);
      return;
    }

    await fetch(
      `http://localhost:8080/transacoes/enviar/${user?.idUser}/${idProfessor}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantidade })
      }
    );

    // MENSAGEM ESTILIZADA — Substitui o alert()
    setMensagem("Moedas enviadas com sucesso!");
    setTimeout(() => setMensagem(""), 4000);

    setQuantidade(0);
  }

  return (
    <>
      {/* Fundo padrão */}
      <div
        className="fixed inset-0 bg-cover bg-center -z-10 brightness-50"
        style={{ backgroundImage: "url('/images/apertodemao.jpg')" }}
      />

      <div className="max-w-3xl mx-auto mt-16 card p-8">

        <h1 className="text-2xl font-bold mb-6 text-white">
          Enviar Moedas aos Professores
        </h1>

        {/* BANNER DE NOTIFICAÇÃO */}
        {mensagem && (
          <div className="mb-6 p-3 rounded-lg border border-emerald-400 bg-emerald-600/20 text-emerald-300 text-center font-semibold shadow-lg">
            {mensagem}
          </div>
        )}

        <div className="mb-6">
          <label className="label text-white">Quantidade de moedas</label>
          <input
            type="number"
            className="input w-full bg-slate-800 text-white border border-white/20"
            placeholder="Ex: 50"
            value={quantidade}
            onChange={(e) => setQuantidade(Number(e.target.value))}
          />
        </div>

        {loading ? (
          <p className="text-white/70">Carregando professores...</p>
        ) : (
          <ul className="space-y-3">
            {professores.map((p) => (
              <li
                key={p.idUser}
                className="p-4 bg-white/10 border border-white/20 rounded-xl flex justify-between items-center"
              >
                <div>
                  <div className="font-semibold text-white">{p.nome}</div>
                  <div className="text-white/60 text-sm">{p.email}</div>
                </div>

                <button
                  className="btn btn-primary"
                  onClick={() => enviar(p.idUser)}
                >
                  Enviar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
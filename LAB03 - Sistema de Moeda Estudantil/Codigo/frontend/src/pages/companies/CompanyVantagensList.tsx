import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type Vantagem = {
  id: number;
  nome: string;
  descricao: string;
  custoEmMoedas: number;
  foto: string;
};

export default function CompanyVantagensList() {
  const [vantagens, setVantagens] = useState<Vantagem[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const navigate = useNavigate();

  // controle do modal
  const [modalAberto, setModalAberto] = useState(false);
  const [vantagemSelecionada, setVantagemSelecionada] =
    useState<Vantagem | null>(null);

  async function carregarVantagens() {
    try {
      setLoading(true);
      setErro(null);

      const res = await fetch("http://localhost:8080/vantagens");
      if (!res.ok) throw new Error("Falha ao carregar vantagens");

      const data = await res.json();
      setVantagens(data);
    } catch (e) {
      console.error(e);
      setErro("Erro ao carregar vantagens.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarVantagens();
  }, []);

  // abrir modal
  function abrirModal(v: Vantagem) {
    setVantagemSelecionada(v);
    setModalAberto(true);
  }

  // excluir definitivamente
  async function confirmarExclusao() {
    if (!vantagemSelecionada) return;

    try {
      const res = await fetch(
        `http://localhost:8080/vantagens/${vantagemSelecionada.id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error("Erro ao excluir");

      // remove da lista
      setVantagens((prev) =>
        prev.filter((v) => v.id !== vantagemSelecionada.id)
      );

      toast.success("Vantagem excluída com sucesso!", {
        theme: "dark",
        position: "top-center",
        style: {
          background: "#0B132B",
          border: "1px solid #14b8a6",
          color: "white",
          padding: "14px 18px",
          borderRadius: "10px",
        },
      });
    } catch (e) {
      toast.error("Erro ao excluir vantagem!", {
        theme: "dark",
        position: "top-center",
        style: {
          background: "#300000",
          border: "1px solid #ff4444",
          color: "white",
          padding: "14px 18px",
          borderRadius: "10px",
        },
      });
    }

    // fecha modal
    setModalAberto(false);
    setVantagemSelecionada(null);
  }

  return (
    <>
      {/* Fundo FULL HD */}
      <div
        className="fixed inset-0 bg-cover bg-center -z-10 brightness-50"
        style={{
          backgroundImage: "url('/images/cadastrar_editar.jpg')",
        }}
      />

      <div className="space-y-6 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-white">
            🎯 Vantagens da Empresa
          </h1>

          <button
            onClick={() => navigate("/empresas/vantagens/nova")}
            className="btn btn-primary"
          >
            + Nova Vantagem
          </button>
        </div>

        {loading && <p className="text-white/80">Carregando...</p>}
        {erro && <p className="text-red-400">{erro}</p>}

        {!loading && vantagens.length === 0 && !erro && (
          <p className="text-white/70">Nenhuma vantagem cadastrada ainda.</p>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vantagens.map((v) => (
            <div
              key={v.id}
              className="bg-[#0f1b3d]/90 border border-white/10 rounded-2xl p-4 shadow-xl backdrop-blur"
            >
              <img
                src={v.foto}
                alt={v.nome}
                className="w-full h-36 object-contain mb-3 rounded-lg bg-slate-900/50 p-2"
              />

              <h2 className="text-lg font-semibold text-white">{v.nome}</h2>
              <p className="text-sm text-white/70 mb-2">{v.descricao}</p>

              <p className="text-emerald-400 font-bold mb-4">
                {v.custoEmMoedas} moedas
              </p>

              <div className="flex justify-between gap-3">
                <button
                  onClick={() => navigate(`/empresas/vantagens/${v.id}`)}
                  className="btn btn-sm btn-primary flex-1"
                >
                  Editar
                </button>

                <button
                  onClick={() => abrirModal(v)}
                  className="btn btn-sm bg-red-600 hover:bg-red-700 text-white flex-1"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de confirmação */}
      {modalAberto && vantagemSelecionada && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="bg-[#0B132B] p-6 rounded-2xl border border-white/20 shadow-xl max-w-md w-full text-center text-white">
            <h2 className="text-xl font-bold mb-3">Excluir Vantagem?</h2>

            <p className="text-white/80 mb-4">
              Tem certeza que deseja excluir:
            </p>

            <p className="text-emerald-300 font-bold text-lg mb-6">
              {vantagemSelecionada.nome}
            </p>

            <div className="flex gap-4 justify-center">
              <button
                onClick={confirmarExclusao}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-semibold"
              >
                Excluir
              </button>

              <button
                onClick={() => setModalAberto(false)}
                className="bg-slate-600 hover:bg-slate-700 px-4 py-2 rounded font-semibold"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
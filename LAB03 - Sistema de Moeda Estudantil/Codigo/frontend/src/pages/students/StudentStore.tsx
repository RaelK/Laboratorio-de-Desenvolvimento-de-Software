import { useEffect, useState } from "react";
import { listarVantagens, realizarResgate } from "../../api/resgates";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { FaCoins, FaStore } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function StudentStore() {
  const [vantagens, setVantagens] = useState<any[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const data = await listarVantagens();
        setVantagens(data);
      } catch {
        toast.error("Erro ao carregar vantagens");
      }
    }
    load();
  }, []);

  async function handleResgatar(id: number) {
    if (!user) {
      toast.error("Você precisa estar logado!");
      return navigate("/login");
    }

    try {
      await realizarResgate({
        alunoId: user.idUser,  // corrigido
        vantagemId: id
      });

      toast.success("Vantagem resgatada com sucesso!");
    } catch (err: any) {
      toast.error(err.response?.data || "Erro ao resgatar vantagem");
    }
  }

  return (
    <div className="container mx-auto mt-6">

      <div
        className="bg-full"
        style={{ backgroundImage: "url('/images/vantagem.jpg')" }}
      ></div>

      <h1 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
        <FaStore /> Loja de Vantagens
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 relative z-10">
        {vantagens.map((v) => (
          <div
            key={v.id}
            className="card bg-[#0b1636]/80 p-4 rounded-xl border border-white/10 shadow-md"
          >
            {v.foto ? (
              <img
                src={v.foto}
                alt={v.nome}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
            ) : (
              <div className="h-40 bg-gray-700 rounded-lg mb-3 flex items-center justify-center text-white/50">
                Sem imagem
              </div>
            )}

            <h2 className="font-bold text-white text-lg">{v.nome}</h2>
            <p className="text-sm text-white/60 mb-2">{v.descricao}</p>

            <p className="font-medium text-coin flex items-center gap-1">
              <FaCoins /> {v.custoEmMoedas} moedas
            </p>

            <button
              className="btn btn-primary w-full mt-3"
              onClick={() => handleResgatar(v.id)}
            >
              Resgatar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
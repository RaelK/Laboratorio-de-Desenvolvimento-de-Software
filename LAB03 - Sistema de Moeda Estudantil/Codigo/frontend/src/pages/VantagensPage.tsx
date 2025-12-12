import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { buscarAlunoPorId } from "../services/alunoService";
import { listarVantagens, resgatarVantagem } from "../services/vantagemService";

export default function VantagensPage() {
  const { user } = useAuth();

  const [saldo, setSaldo] = useState<number | null>(null);
  const [vantagens, setVantagens] = useState<any[]>([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [vantagemSelecionada, setVantagemSelecionada] = useState<any | null>(null);
  const [mensagem, setMensagem] = useState("");

  const [cupom, setCupom] = useState<any | null>(null);

  // NOVOS ESTADOS DA BARRA DE PROGRESSO
  const [progresso, setProgresso] = useState(0);
  const [etapa, setEtapa] = useState("");
  const [processando, setProcessando] = useState(false);

  // Carregar saldo
  useEffect(() => {
    async function carregarSaldo() {
      if (!user) return;

      try {
        const dados = await buscarAlunoPorId(user.idUser);
        setSaldo(dados.saldoMoedas);
      } catch (err) {
        console.error("Erro ao carregar saldo:", err);
      }
    }
    carregarSaldo();
  }, [user]);

  // Carregar vantagens
  useEffect(() => {
    async function carregarVantagens() {
      try {
        const lista = await listarVantagens();
        setVantagens(lista);
      } catch (err) {
        console.error("Erro ao carregar vantagens:", err);
      }
    }
    carregarVantagens();
  }, []);

  // Abrir modal
  function abrirModal(v: any) {
    setVantagemSelecionada(v);
    setMensagem("");
    setCupom(null);
    setProgresso(0);
    setEtapa("");
    setProcessando(false);
    setModalAberto(true);
  }

  // Função auxiliar para simular progresso
  function avançar(etapaNome: string, valor: number) {
    setEtapa(etapaNome);
    setProgresso(valor);
  }

  // Confirmar resgate
  async function confirmarResgate() {
    if (!user || !vantagemSelecionada) return;

    setProcessando(true);
    setMensagem("");

    try {
      avançar("Validando saldo...", 15);

      await new Promise((r) => setTimeout(r, 300));

      avançar("Gerando código...", 35);
      await new Promise((r) => setTimeout(r, 300));

      avançar("Gerando QR Code...", 55);
      await new Promise((r) => setTimeout(r, 300));

      avançar("Enviando e-mail ao aluno...", 75);

      const resposta = await resgatarVantagem(user.idUser, vantagemSelecionada.id);

      avançar("Enviando e-mail ao parceiro...", 90);
      await new Promise((r) => setTimeout(r, 400));

      setCupom(resposta);

      avançar("Finalizado!", 100);

      setMensagem("Vantagem resgatada com sucesso!");

      // Atualizar saldo
      const dados = await buscarAlunoPorId(user.idUser);
      setSaldo(dados.saldoMoedas);
    } catch (err) {
      setMensagem("Erro ao resgatar vantagem.");
      console.error(err);

      setProcessando(false);
      setEtapa("Falha no processo");
      setProgresso(0);
    }
  }

  // Baixar cupom
  function baixarCupom() {
    const link = document.createElement("a");
    link.href = "data:image/png;base64," + cupom.qrCode;
    link.download = `cupom-${cupom.codigoCupom}.png`;
    link.click();
  }

  return (
    <div className="relative text-white">

      {/* Fundo Full HD */}
      <div className="bg-full" style={{ backgroundImage: "url('/images/vantagem.jpg')" }}></div>

      <div className="relative p-6">

        <div className="mb-6 p-4 bg-[#0b1636]/70 border border-white/20 rounded-xl inline-block shadow-lg">
          <h2 className="text-3xl font-bold text-amber-300 drop-shadow">
            Saldo: {saldo ?? "Carregando..."} moedas
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {vantagens.map((v) => (
            <div key={v.id} className="bg-[#0b1636]/70 p-4 rounded-xl border border-white/10 shadow-md">
              <img src={v.foto} className="w-24 mx-auto mb-3 rounded-lg" alt={v.nome} />

              <h3 className="text-xl font-bold">{v.nome}</h3>
              <p className="text-sm text-gray-300">{v.descricao}</p>

              <div className="mt-3 font-semibold text-amber-300">Custo: {v.custoEmMoedas} moedas</div>

              <button onClick={() => abrirModal(v)} className="btn btn-primary w-full mt-4">
                Resgatar
              </button>
            </div>
          ))}
        </div>

        {/* Modal */}
        {modalAberto && vantagemSelecionada && (
          <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
            <div className="bg-slate-800 p-6 rounded-xl w-full max-w-md text-center border border-white/20">

              {/* PROGRESSO */}
              {processando && (
                <div className="mb-6">
                  <p className="text-amber-300 font-semibold mb-2">{etapa}</p>

                  <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-amber-400 h-3 transition-all duration-300"
                      style={{ width: `${progresso}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Antes de gerar cupom */}
              {!cupom && !processando && (
                <>
                  <h2 className="text-2xl font-bold mb-4">Confirmar Resgate</h2>

                  <p className="mb-6">
                    Deseja resgatar <strong>{vantagemSelecionada.nome}</strong> por{" "}
                    <strong>{vantagemSelecionada.custoEmMoedas} moedas</strong>?
                  </p>

                  {mensagem && (
                    <p className="bg-red-600 p-2 rounded text-white mb-4">{mensagem}</p>
                  )}

                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={confirmarResgate}
                      className="btn-primary px-4 py-2 rounded"
                      disabled={processando}
                    >
                      Confirmar
                    </button>

                    <button
                      onClick={() => setModalAberto(false)}
                      className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
                    >
                      Cancelar
                    </button>
                  </div>
                </>
              )}

              {/* Cupom Gerado */}
              {cupom && (
                <div className="mt-4">
                  <h2 className="text-2xl font-bold text-amber-300 mb-3">Cupom Gerado!</h2>

                  <p className="text-gray-300 mb-3">{cupom.vantagem.nome}</p>

                  <img
                    src={`data:image/png;base64,${cupom.qrCode}`}
                    className="w-48 mx-auto mb-4 rounded-lg border border-amber-300"
                    alt="QR Code"
                  />

                  <p className="text-lg mb-4">
                    Código do Cupom:
                    <span className="text-amber-300 font-bold"> {cupom.codigoCupom}</span>
                  </p>

                  <button onClick={baixarCupom} className="bg-amber-400 text-black px-4 py-2 rounded font-semibold w-full mb-3">
                    Baixar Cupom
                  </button>

                  <button onClick={() => setModalAberto(false)} className="bg-blue-700 px-4 py-2 rounded w-full">
                    Fechar
                  </button>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
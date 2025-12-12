import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";

type Vantagem = {
  id: number;
  nome: string;
  descricao: string;
  custoEmMoedas: number;
  foto: string;
};

type ResgateResponseDTO = {
  codigoCupom: string;
  vantagem: string;
  empresa: string | null;
};

export default function VantagensPage() {
  const { user } = useAuth();
  const [saldo, setSaldo] = useState<number>(0);
  const [mensagem, setMensagem] = useState("");
  const [vantagens, setVantagens] = useState<Vantagem[]>([]);
  const [cupom, setCupom] = useState<ResgateResponseDTO | null>(null);
  const [imagemSelecionada, setImagemSelecionada] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    setSaldo(user.saldoMoedas ?? 0);
  }, [user]);

  useEffect(() => {
    fetch("http://localhost:8080/vantagens")
      .then((res) => res.json())
      .then(setVantagens)
      .catch(() => console.log("Falha ao carregar vantagens"));
  }, []);

  async function handleResgate(v: Vantagem) {
    if (!user) return;

    setMensagem("");

    if (saldo < v.custoEmMoedas) {
      setMensagem("⚠️ Saldo insuficiente!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/resgates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          alunoId: user.id,
          vantagemId: v.id,
        }),
      });

      if (!response.ok) throw new Error("Erro ao resgatar vantagem");

      const data: ResgateResponseDTO = await response.json();

      setCupom(data);
      setImagemSelecionada(v.foto);
      setSaldo((prev) => prev - v.custoEmMoedas);
      setMensagem("🎉 Resgate realizado com sucesso!");

    } catch (error) {
      console.error(error);
      setMensagem("⚠️ Erro ao realizar resgate!");
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">

      {/* Fundo escuro */}
      <div className="fixed inset-0 -z-10">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: 'url("/images/vantagem.jpg")' }}
        />
        <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
      </div>

      <section className="relative w-full max-w-6xl mx-auto py-20 px-6 text-white">
        <h1 className="text-4xl font-bold mb-2">Loja de Vantagens 🎁</h1>
        <p className="text-lg text-white/80 mb-6">
          Saldo: <strong className="text-emerald-400">{saldo} moedas</strong>
        </p>

        {mensagem && (
          <div className="bg-emerald-600 text-white px-4 py-2 rounded-lg mb-5 shadow-xl">
            {mensagem}
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {vantagens.map((v) => (
            <div
              key={v.id}
              className="bg-slate-800/90 border border-white/10 backdrop-blur-xl p-4 rounded-2xl shadow-lg hover:shadow-emerald-400/40 transition"
            >
              <img
                src={v.foto}
                alt={v.nome}
                className="w-full h-28 object-contain mb-3"
              />
              <h2 className="font-semibold text-lg">{v.nome}</h2>
              <p className="text-sm text-white/70">{v.descricao}</p>

              <div className="flex justify-between items-center mt-3">
                <span className="text-emerald-400 font-bold">
                  {v.custoEmMoedas} moedas
                </span>

                <button
                  onClick={() => handleResgate(v)}
                  className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-sm rounded font-semibold transition"
                >
                  Resgatar
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal do Cupom + QRCode */}
      {cupom && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-white max-w-lg w-full p-6 rounded-xl shadow-xl text-black overflow-auto max-h-[90vh] text-center">
            <h2 className="font-bold text-lg mb-4">🎫 Cupom de Resgate</h2>

            <img
              src={imagemSelecionada || ""}
              alt="Imagem da vantagem"
              className="rounded-lg w-40 mx-auto mb-3"
            />

            <p><strong>Vantagem:</strong> {cupom.vantagem}</p>
            <p><strong>Código:</strong> {cupom.codigoCupom}</p>

            {cupom.empresa && (
              <p><strong>Parceiro:</strong> {cupom.empresa}</p>
            )}

            <div className="flex justify-center mt-4">
              <QRCodeCanvas value={cupom.codigoCupom} size={160} />
            </div>

            <p className="text-sm text-gray-600 mt-2">
              Apresente este QR Code no local da vantagem
            </p>

            <button
              className="mt-6 bg-emerald-600 text-white px-4 py-2 w-full rounded-lg hover:bg-emerald-700"
              onClick={() => setCupom(null)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
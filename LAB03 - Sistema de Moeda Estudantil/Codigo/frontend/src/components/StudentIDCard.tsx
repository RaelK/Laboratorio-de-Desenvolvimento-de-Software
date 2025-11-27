import { Aluno } from "../types";
import "./studentCard.css";

type Props = {
  aluno: Pick<
    Aluno,
    "nome" | "curso" | "saldoMoedas" | "cpf" | "instituicaoEnsino"
  > & {
    registro?: string;
    validade?: string;
    situacao?: "ATIVO" | "INATIVO";
    avatarUrl?: string;
    universidadeLogoUrl?: string;
    qrCodeUrl?: string;
  };
};

export default function StudentIDCard({ aluno }: Props) {
  const {
    nome,
    curso,
    saldoMoedas,
    cpf,
    instituicaoEnsino,
    registro = "7777-9999-10",
    validade = "11/12/2026",
    situacao = "ATIVO",
    avatarUrl = "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
    universidadeLogoUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Logo_UFMG.png/800px-Logo_UFMG.png",
    qrCodeUrl,
  } = aluno;

  return (
    <div className="flip-card">
      <div className="flip-card-inner">

        {/* ================= FRENTE ================= */}
        <div className="flip-card-front">
          <div
            className="
              mx-auto w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden
              bg-gradient-to-b from-cyan-700 to-cyan-600 text-white
            "
          >
            <div className="flex items-center justify-between px-5 py-2 text-xs/5 opacity-90">
              <span>10:30 AM</span>
              <span>100%</span>
            </div>

            <div className="px-5 pb-4">
              <div className="flex items-center gap-4">
                <img
                  src={avatarUrl}
                  alt={nome}
                  className="size-16 rounded-xl object-cover ring-2 ring-white/20"
                />
                <div className="min-w-0">
                  <div className="font-semibold truncate">{nome}</div>
                  <div className="text-sm/5 opacity-90 truncate">
                    {instituicaoEnsino?.nome}
                  </div>
                  <div className="text-sm/5 opacity-90 truncate">{curso}</div>
                </div>
              </div>
            </div>

            <div className="bg-white text-slate-800 rounded-t-2xl px-5 py-4 relative">
              <div className="absolute -top-6 right-5 bg-white rounded-full shadow-md p-1">
                <img
                  src={universidadeLogoUrl}
                  alt="Logo da universidade"
                  className="h-8 w-8 object-contain"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="text-slate-500">Registro</div>
                  <div className="font-semibold">{registro}</div>
                </div>
                <div>
                  <div className="text-slate-500">Validade</div>
                  <div className="font-semibold">{validade}</div>
                </div>
                <div>
                  <div className="text-slate-500">CPF</div>
                  <div className="font-semibold">{cpf}</div>
                </div>
                <div>
                  <div className="text-slate-500">Situação</div>
                  <div
                    className={`font-semibold ${situacao === "ATIVO" ? "text-emerald-600" : "text-red-600"
                      }`}
                  >
                    {situacao}
                  </div>
                </div>
                <div>
                  <div className="text-slate-500">Saldo em moedas</div>
                  <div className="font-semibold">{saldoMoedas}</div>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                {qrCodeUrl ? (
                  <img src={qrCodeUrl} alt="QR Code" className="h-14 w-14" />
                ) : (
                  <div className="h-14 w-14 rounded-lg bg-slate-200" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ================= VERSO ================= */}
        <div className="flip-card-back">
          <div className="mx-auto w-full max-w-sm rounded-3xl shadow-2xl bg-gradient-to-b from-cyan-700 to-cyan-600 text-white p-6">
            <h2 className="text-xl font-bold mb-4">Dados do Aluno</h2>

            <p><strong>Nome:</strong> {nome}</p>
            <p><strong>Curso:</strong> {curso}</p>
            <p><strong>Instituição:</strong> {instituicaoEnsino?.nome}</p>
            <p><strong>CPF:</strong> {cpf}</p>
            <p><strong>Registro:</strong> {registro}</p>
            <p><strong>Validade:</strong> {validade}</p>
            <p><strong>Saldo:</strong> {saldoMoedas} moedas</p>

            <div className="mt-4 text-center text-xs opacity-60">
              * Informações oficiais do sistema bitStudent *
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
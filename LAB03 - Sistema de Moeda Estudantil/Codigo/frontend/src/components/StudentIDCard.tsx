import { Aluno } from "../types";

type Props = {
  aluno: Pick<
    Aluno,
    "nome" | "curso" | "saldoMoedas" | "cpf" | "instituicaoEnsino"
  > & {
    registro?: string;            // ex.: "7777-9999-10"
    validade?: string;            // ex.: "11/12/2026"
    situacao?: "ATIVO" | "INATIVO";
    avatarUrl?: string;
    universidadeLogoUrl?: string;
    qrCodeUrl?: string;           // opcional (pode ser um data URL)
  };
};

export default function StudentIDCard({
  aluno: {
    nome,
    curso,
    saldoMoedas,
    cpf,
    instituicaoEnsino,
    registro = "—",
    validade = "—",
    situacao = "ATIVO",
    avatarUrl = "https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=" +
      encodeURIComponent(nome ?? "Aluno"),
    universidadeLogoUrl,
    qrCodeUrl,
  },
}: Props) {
  return (
    <div
      className="
        mx-auto w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden
        bg-gradient-to-b from-cyan-700 to-cyan-600 text-white
      "
      role="img"
      aria-label="Carteira Estudantil Digital"
    >
      {/* Top bar (hora/bateria apenas decorativo) */}
      <div className="flex items-center justify-between px-5 py-2 text-xs/5 opacity-90">
        <span>10:30 AM</span>
        <span>100%</span>
      </div>

      {/* Header com foto e nome/curso */}
      <div className="px-5 pb-4">
        <div className="flex items-center gap-4">
          <img
            src={avatarUrl}
            alt={nome}
            className="size-16 rounded-xl object-cover ring-2 ring-white/20"
          />
          <div className="min-w-0">
            <div className="font-semibold truncate">{nome}</div>
            <div className="text-sm/5 opacity-90 truncate">{instituicaoEnsino?.nome}</div>
            <div className="text-sm/5 opacity-90 truncate">{curso}</div>
          </div>
        </div>
      </div>

      {/* Corpo branco com dados (cartão) */}
      <div className="bg-white text-slate-800 rounded-t-2xl px-5 py-4 relative">
        <div className="absolute -top-6 right-5 text-[10px] bg-white/20 text-white px-2 py-1 rounded-lg">
          Situação <span className="font-semibold">{situacao}</span>
        </div>

        <div className="flex items-center gap-3 pb-2">
          {universidadeLogoUrl ? (
            <img src={universidadeLogoUrl} alt="Universidade" className="h-8" />
          ) : (
            <div className="h-8 w-8 rounded bg-cyan-700/20" />
          )}
          <div className="text-cyan-800 font-bold tracking-wide">IDESTUDANTIL</div>
        </div>

        <p className="text-sm text-slate-600 mb-3">
          Homologada pelo Ministério da Educação
        </p>

        <div className="grid grid-cols-2 gap-3 text-sm">
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
            <div className="text-slate-500">Saldo (moedas)</div>
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
  );
}
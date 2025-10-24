import { useMemo, useState } from "react";

type Payment = {
  dinheiro?: number;
  cheque?: number;
  pix?: number;
  cartao?: number;
  desconto?: number;
  multa?: number;
  juros?: number;
  outros?: number;
  totalAPagar: number; // valor bruto da cobrança
};

export default function CompanyChargePanel({
  totalAPagar = 100,
}: Partial<Payment>) {
  const [p, setP] = useState<Payment>({
    totalAPagar,
    dinheiro: 0,
    cheque: 0,
    pix: 0,
    cartao: 0,
    desconto: 0,
    multa: 0,
    juros: 0,
    outros: 0,
  });

  function upd<K extends keyof Payment>(k: K, v: number) {
    setP((s) => ({ ...s, [k]: v }));
  }

  const totalRecebido = useMemo(
    () => (p.dinheiro ?? 0) + (p.cheque ?? 0) + (p.pix ?? 0) + (p.cartao ?? 0) + (p.outros ?? 0),
    [p]
  );

  const totalComAjustes = useMemo(
    () => p.totalAPagar + (p.multa ?? 0) + (p.juros ?? 0) - (p.desconto ?? 0),
    [p]
  );

  const trocoOuFalta = useMemo(
    () => Number((totalRecebido - totalComAjustes).toFixed(2)),
    [totalRecebido, totalComAjustes]
  );

  return (
    <div className="card">
      <div className="text-xl font-bold mb-4">Recebendo Cobrança</div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Esquerda: formas de pagamento */}
        <div className="space-y-3">
          {[
            ["Dinheiro", "dinheiro"],
            ["Cheque", "cheque"],
            ["PIX", "pix"],
            ["Cartão", "cartao"],
            ["Outros", "outros"],
          ].map(([label, key]) => (
            <div key={key} className="grid grid-cols-[1fr,140px] items-center gap-3">
              <label className="label">{label}</label>
              <input
                type="number"
                step="0.01"
                className="input text-right"
                value={(p as any)[key] ?? 0}
                onChange={(e) => upd(key as any, Number(e.target.value))}
              />
            </div>
          ))}
        </div>

        {/* Direita: ajustes e totais */}
        <div className="space-y-3">
          {[
            ["Multa (R$)", "multa"],
            ["Juros (R$)", "juros"],
            ["Desconto (R$)", "desconto"],
          ].map(([label, key]) => (
            <div key={key} className="grid grid-cols-[1fr,140px] items-center gap-3">
              <label className="label">{label}</label>
              <input
                type="number"
                step="0.01"
                className="input text-right"
                value={(p as any)[key] ?? 0}
                onChange={(e) => upd(key as any, Number(e.target.value))}
              />
            </div>
          ))}

          <div className="h-px bg-white/10 my-2" />

          <div className="grid grid-cols-2 gap-3">
            <div className="label">Total a Pagar</div>
            <div className="text-right font-semibold">{totalComAjustes.toFixed(2)}</div>

            <div className="label">Recebido</div>
            <div className="text-right">{totalRecebido.toFixed(2)}</div>

            <div className="label">Diferença</div>
            <div
              className={`text-right font-semibold ${
                trocoOuFalta >= 0 ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              {trocoOuFalta.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-white/60">
          Total original: <span className="font-semibold">R$ {p.totalAPagar.toFixed(2)}</span>
        </div>
        <div className="flex gap-2">
          <button className="btn">Voltar</button>
          <button className="btn btn-primary">Confirmar</button>
        </div>
      </div>
    </div>
  );
}
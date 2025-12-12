export function criarTemplateCupom({
  alunoNome,
  vantagemTitulo,
  codigo,
  imagemUrl,
  qrCodeBase64
}: {
  alunoNome: string;
  vantagemTitulo: string;
  codigo: string;
  imagemUrl: string;
  qrCodeBase64: string;
}) {
  return `
  <div style="font-family: Arial, sans-serif; max-width: 560px; margin: auto;
    background: #0B132B; padding: 24px; border-radius: 12px; color: #ffffff;
    border: 2px solid #FFD700;">

    <h2 style="text-align:center; color:#FFD700; margin-bottom:20px;">
      Cupom de Resgate – BitStudent
    </h2>

    <p style="text-align:center; font-size:16px;">
      Olá <strong>${alunoNome}</strong>, seu resgate foi realizado com sucesso! 🎉
    </p>

    <div style="text-align:center; margin: 20px 0;">
      <img src="${imagemUrl}" alt="Vantagem"
        style="width: 240px; border-radius: 10px; box-shadow:0 0 10px #FFD70099;"/>
    </div>

    <p style="font-size:15px; margin-top:10px;">Vantagem resgatada:</p>
    <p style="font-size:20px; font-weight:bold; color:#4ade80; margin-top:4px;">
      ${vantagemTitulo}
    </p>

    <!-- QR CODE -->
    <div style="text-align:center; margin:25px 0;">
      <img src="data:image/png;base64,${qrCodeBase64}"
        style="width:180px; border:3px solid #FFD700; border-radius:8px;"/>
    </div>

    <!-- CÓDIGO DO CUPOM -->
    <div style="background:#1E293B; padding:14px; margin:20px 0;
      border-radius:8px; text-align:center; border:1px dashed #4ade80;">
      <span style="font-size:22px; font-weight:bold; color:#4ade80;">
        ${codigo}
      </span>
    </div>

    <p style="font-size:14px; opacity:0.85; margin-bottom:16px;">
      Apresente o QR Code ou o código no estabelecimento parceiro para validar seu benefício.
    </p>

    <p style="font-size:12px; opacity:0.5; margin-top:14px; text-align:center;">
      *Cupom exclusivo e intransferível. Gerado automaticamente pelo sistema BitStudent.
    </p>
  </div>
  `;
}
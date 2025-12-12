import { criarTemplateCupom } from "./emailTemplates";

export async function enviarEmailResgate({
  alunoNome,
  alunoEmail,
  parceiroNome,
  parceiroEmail,
  vantagemTitulo,
  codigo,
  imagemUrl,
}: {
  alunoNome: string;
  alunoEmail: string;
  parceiroNome: string;
  parceiroEmail: string;
  vantagemTitulo: string;
  codigo: string;
  imagemUrl: string;
}) {
  console.log("📧 Enviando e-mail de cupom...");
  console.log(`
  Para aluno: ${alunoEmail}
  Para parceiro: ${parceiroEmail}
  Cupom: ${codigo}
  Vantagem: ${vantagemTitulo}
  `);

  const templateHTML = criarTemplateCupom({
    alunoNome,
    vantagemTitulo,
    codigo,
    imagemUrl,
  });

  alert("📩 Email enviado! (Simulação)");
  return templateHTML; // retorno para testes
}
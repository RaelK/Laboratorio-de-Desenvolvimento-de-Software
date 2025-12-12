// ------------------------------------------------------------
// LISTAR TODAS AS VANTAGENS
// ------------------------------------------------------------
export async function listarVantagens() {
  const resp = await fetch("http://localhost:8080/vantagens");

  if (!resp.ok) {
    throw new Error("Erro ao carregar vantagens");
  }

  return resp.json();
}

// ------------------------------------------------------------
// RESGATAR VANTAGEM
// Tratamento TOTALMENTE corrigido:
// - Captura texto ou JSON vindo do backend
// - Retorna erro com mensagem correta (ex.: "Saldo insuficiente")
// - Evita erro falso quando o backend retorna objeto de cupom
// ------------------------------------------------------------
export async function resgatarVantagem(alunoId: number, vantagemId: number) {
  const url = `http://localhost:8080/resgates/resgatar?alunoId=${alunoId}&vantagemId=${vantagemId}`;

  const resp = await fetch(url, {
    method: "POST",
  });

  // Capturamos SEMPRE o texto cru para tentar interpretar
  const raw = await resp.text();

  // --------------------------------------------------------
  // SE DER ERRO: pegar mensagem correta do backend
  // --------------------------------------------------------
  if (!resp.ok) {
    console.error("Resposta do backend:", raw);

    let message = "Erro ao resgatar vantagem.";

    try {
      const json = JSON.parse(raw);
      if (json.error) message = json.error;
      if (json.message) message = json.message;
    } catch (_) { }

    throw new Error(message);
  }

  // --------------------------------------------------------
  // SE SUCESSO: tentar converter para JSON
  // --------------------------------------------------------
  try {
    return JSON.parse(raw);
  } catch {
    // Caso retorne vazio ou texto, ainda assim retornar algo útil
    return { sucesso: true, dados: raw };
  }
}
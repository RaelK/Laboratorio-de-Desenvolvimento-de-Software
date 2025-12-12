export async function buscarAlunoPorId(id: number) {
  const resp = await fetch(`http://localhost:8080/alunos/${id}`);

  if (!resp.ok) {
    throw new Error("Erro ao buscar aluno");
  }

  return resp.json();
}
import { api } from "../services/api";
import type { Aluno, AlunoCreate } from "../types";

// =====================
// LISTAR
// =====================
export async function listStudents(): Promise<Aluno[]> {
  const { data } = await api.get("/alunos");
  return data;
}

// =====================
// BUSCAR POR ID
// =====================
export async function getStudent(id: string): Promise<Aluno | null> {
  try {
    const { data } = await api.get(`/alunos/${id}`);
    return data;
  } catch (err: any) {
    if (err.response?.status === 404) {
      return null; // ← resolve “Esse aluno não existe”
    }
    throw err;
  }
}

// =====================
// CRIAR
// =====================
export async function createStudent(payload: AlunoCreate): Promise<Aluno> {
  const { data } = await api.post("/alunos", payload);
  return data;
}

// =====================
// ATUALIZAR
// =====================
export async function updateStudent(
  id: string,
  payload: AlunoCreate
): Promise<Aluno> {
  const { data } = await api.put(`/alunos/${id}`, payload);
  return data;
}

// =====================
// DELETAR (corrige erro TS2724)
// =====================
export async function deleteStudent(id: string): Promise<void> {
  await api.delete(`/alunos/${id}`);
}

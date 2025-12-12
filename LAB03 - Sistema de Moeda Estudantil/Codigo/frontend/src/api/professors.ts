import { api } from "./client";
import type { Professor, ProfessorCreate } from "../types";

export async function getProfessor(id: string): Promise<Professor> {
  const { data } = await api.get(`/professores/${id}`);
  return data;
}

export async function createProfessor(payload: ProfessorCreate): Promise<Professor> {
  const { data } = await api.post("/professores", payload);
  return data;
}

export async function updateProfessor(id: number, payload: ProfessorCreate): Promise<Professor> {
  const { data } = await api.put(`/professores/${id}`, payload);
  return data;
}
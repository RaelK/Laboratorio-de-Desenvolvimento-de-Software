import { api } from "./client";
import type { Aluno, AlunoCreate } from "../types";

export async function listStudents(): Promise<Aluno[]> {
  const { data } = await api.get("/alunos");
  return data;
}

export async function getStudent(id: string): Promise<Aluno> {
  const { data } = await api.get(`/alunos/${id}`);
  return data;
}

export async function createStudent(payload: AlunoCreate): Promise<Aluno> {
  const { data } = await api.post("/alunos", payload);
  return data;
}

export async function updateStudent(id: string, payload: AlunoCreate): Promise<Aluno> {
  const { data } = await api.put(`/alunos/${id}`, payload);
  return data;
}
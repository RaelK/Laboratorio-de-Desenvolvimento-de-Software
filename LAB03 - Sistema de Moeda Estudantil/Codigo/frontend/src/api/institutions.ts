import { api } from "./client";

export type InstituicaoEnsino = {
  id: number;
  nome: string;
};

export async function listInstitutions(): Promise<InstituicaoEnsino[]> {
  const { data } = await api.get("/instituicoes");
  return data;
}
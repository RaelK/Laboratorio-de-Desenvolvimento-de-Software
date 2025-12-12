import { api } from "./client";
import type { Transacao } from "../types";

export type TransferPayload = {
  professorId: number;
  alunoId: number;
  valor: number;
  descricao: string;
};

/**
 * Envia moedas do professor para o aluno
 * Compatível com TransacaoCreateDTO do backend.
 */
export async function transferirMoedas(
  payload: TransferPayload
): Promise<Transacao> {
  const body = {
    idProfessor: payload.professorId, // backend exige esse nome
    idAluno: payload.alunoId,         // backend exige esse nome
    valor: payload.valor,
    descricao: payload.descricao,
  };

  console.log("Enviando payload para backend:", body);

  const { data } = await api.post("/transacoes/enviar", body);
  return data;
}

/**
 * Lista extrato do aluno
 * Backend: GET /transacoes/aluno/{id}
 */
export async function getExtratoAluno(
  id: number | string
): Promise<Transacao[]> {
  const { data } = await api.get(`/transacoes/aluno/${id}`);
  return data;
}

/**
 * Lista extrato do professor
 * Backend: GET /transacoes/professor/{id}
 */
export async function getExtratoProfessor(
  id: number | string
): Promise<Transacao[]> {
  const { data } = await api.get(`/transacoes/professor/${id}`);
  return data;
}
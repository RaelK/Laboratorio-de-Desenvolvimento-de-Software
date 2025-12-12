import { api } from "./client";
import type { EmpresaParceira, EmpresaCreate } from "../types";

export async function getCompany(id: number): Promise<EmpresaParceira> {
  const { data } = await api.get(`/empresas/${id}`);
  return data;
}

export async function createCompany(payload: EmpresaCreate) {
  const { data } = await api.post("/empresas", payload);
  return data;
}

export async function updateCompany(id: number, payload: EmpresaCreate) {
  const { data } = await api.put(`/empresas/${id}`, payload);
  return data;
}

export async function deleteCompany(id: number) {
  await api.delete(`/empresas/${id}`);
}
import axios from "axios";

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  id: number;
  nome: string;
  email: string;
  token?: string;
  tipo: "ALUNO" | "PROFESSOR";
}

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  const response = await api.post("/login", credentials);
  return response.data;
}
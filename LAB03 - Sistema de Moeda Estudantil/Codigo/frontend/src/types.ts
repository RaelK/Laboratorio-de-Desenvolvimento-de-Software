export type InstituicaoEnsino = { id: number; nome: string }

export type Aluno = {
  id: number
  nome: string
  email: string
  cpf: string
  login: string
  rg: string
  endereco: string
  curso: string
  saldoMoedas: number
  instituicaoEnsino: InstituicaoEnsino
}

// Payload para create/update conforme AlunoCreateDTO
export type AlunoCreate = {
  nome: string
  email: string
  cpf: string
  login: string
  senha: string
  rg: string
  endereco: string
  curso: string
  saldoMoedas: number
  instituicaoEnsino: InstituicaoEnsino
}

export type EmpresaParceira = {
  id: number
  nome: string
  email: string
  login: string
}

export type EmpresaCreate = {
  nome: string
  email: string
  login: string
  senha: string
}

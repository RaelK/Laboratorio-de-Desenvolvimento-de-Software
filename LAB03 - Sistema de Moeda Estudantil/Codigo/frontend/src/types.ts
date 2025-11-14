// Tipos principais do sistema de moeda estudantil

export type InstituicaoEnsino = {
  id: number
  nome: string
}

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

// Professores pré-cadastrados pela instituição
export type Professor = {
  id: number
  nome: string
  email: string
  cpf?: string
  departamento?: string
  saldoMoedas: number
  instituicaoEnsino?: InstituicaoEnsino // vínculo institucional opcional, pode vir do backend
}

// Transações (envio, recebimento ou troca)
export type Transacao = {
  id: number
  data: string
  valor: number
  descricao: string
  professor?: Professor
  aluno?: Aluno
}
/* ======================================================
   INSTITUIÇÃO (somente para SELECT do front-end)
====================================================== */
export type InstituicaoEnsino = {
  id: number;
  nome: string;
};

/* ======================================================
   ALUNO — MODELO REAL DO BACKEND
====================================================== */
export type Aluno = {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  login: string;
  rg: string;
  endereco: string;
  curso: string;
  saldoMoedas: number;

  // backend envia STRING (ex: "UFMG", "CEFET-MG")
  instituicao: string;
};

/* Payload enviado no create/update */
export type AlunoCreate = {
  nome: string;
  email: string;
  cpf: string;
  login: string;
  senha: string;
  rg: string;
  endereco: string;
  curso: string;

  saldoMoedas?: number; // frontend envia 0 ao criar
  instituicao: string; // backend aceita APENAS string
};

/* ======================================================
   EMPRESA PARCEIRA — MODELO REAL
====================================================== */
export type EmpresaParceira = {
  id: number;
  nome: string;
  email: string;

  // campos opcionais apenas para o frontend
  login?: string;
  cnpj?: string;
  endereco?: string;
};

export type EmpresaCreate = {
  nome: string;
  email: string;
  senha: string;

  login?: string;
  cnpj?: string;
  endereco?: string;
};

/* ======================================================
   PROFESSOR — MODELO REAL DO BACKEND
====================================================== */
export type Professor = {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  departamento: string;
  saldoMoedas: number;

  senha?: string;

  // usado SOMENTE no frontend (exibição)
  instituicaoEnsino?: InstituicaoEnsino;
};

export type ProfessorCreate = {
  nome: string;
  email: string;
  departamento: string;
  senha: string;

  // não existe no backend, apenas no front
  instituicaoEnsino?: InstituicaoEnsino;
};

/* ======================================================
   TRANSAÇÃO
====================================================== */
export type Transacao = {
  id: number;
  data: string;
  valor: number;
  descricao: string;
  tipo: "ENVIO" | "RESGATE";

  professor?: Professor;
  aluno?: Aluno;
};

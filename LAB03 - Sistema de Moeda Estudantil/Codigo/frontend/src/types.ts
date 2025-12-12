/* ======================================================
   INSTITUIÇÃO (somente para SELECT do front-end)
====================================================== */
export type InstituicaoEnsino = {
  id: number;
  nome: string;
};

/* ======================================================
   ALUNO — MODELO REAL DO BACKEND
   (backend usa STRING para instituição)
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

  instituicao: string; // STRING do backend (UFMG, CEFET-MG etc.)
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

  saldoMoedas?: number;   // enviado como 0 ao criar

  instituicao: string;    // backend aceita APENAS string
};

/* ======================================================
   EMPRESA PARCEIRA — modelo real
====================================================== */
export type EmpresaParceira = {
  id: number;
  nome: string;
  email: string;
  login?: string;   // não existe no backend, mas é opcional no front
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
   PROFESSOR — modelo real do backend
====================================================== */
export type Professor = {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  departamento: string;
  saldoMoedas: number;
  senha?: string;

  // FRONT usa isto apenas para exibir, backend NÃO usa
  instituicaoEnsino?: InstituicaoEnsino;
};

export type ProfessorCreate = {
  nome: string;
  email: string;
  departamento: string;
  senha: string;

  // não existe no backend, opcional apenas no front
  instituicaoEnsino?: {
    id: number;
    nome: string;
  };
};

/* ======================================================
   TRANSACÃO
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
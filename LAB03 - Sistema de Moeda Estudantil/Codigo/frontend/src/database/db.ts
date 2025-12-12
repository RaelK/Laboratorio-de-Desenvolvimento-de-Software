export const db = {
  instituicoes: [
    { id: 1, nome: "Universidade Federal" },
    { id: 2, nome: "Instituto Tecnológico" },
    { id: 3, nome: "Centro Universitário" },
  ],

  alunos: [
    {
      id: 1,
      nome: "Aluno Exemplo",
      email: "aluno@teste.com",
      senha: "123",
      cpf: "000.000.000-00",
      rg: "00.000.000-0",
      endereco: "Rua A, 100",
      curso: "Engenharia",
      instituicao: 1,
      saldo: 500,
      carteira: {
        codigo: "CRT-001",
        qr: "QR-ALUNO-001",
      },
      transacoes: [],
    },
  ],

  professores: [
    {
      id: 1,
      nome: "Prof. João Silva",
      email: "professor@teste.com",
      senha: "123",
      cpf: "111.111.111-11",
      departamento: "Engenharia",
      instituicao: 1,
      saldo: 2000,
      transacoes: [],
    },
  ],

  empresas: [
    {
      id: 1,
      nome: "Lanches Universitários",
      email: "empresa@teste.com",
      senha: "123",
      vantagens: [
        {
          id: 1,
          nome: "Lanche 50% OFF",
          descricao: "Desconto de 50% no combo universitário",
          custo: 300,
          imagemUrl:
            "https://cdn-icons-png.flaticon.com/512/3075/3075977.png",
        },
        {
          id: 2,
          nome: "Lanche 30% OFF",
          descricao: "Desconto de 30% no combo",
          custo: 200,
          imagemUrl:
            "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
        },
      ],
    },
  ],
};
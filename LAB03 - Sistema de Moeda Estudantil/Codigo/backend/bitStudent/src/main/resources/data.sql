-- ============================================================
-- INSTITUIÇÕES DE ENSINO  (tabela: instituicao_ensino)
-- ============================================================

INSERT INTO instituicao_ensino (nome)
VALUES ('UFMG'), ('CEFET-MG'), ('PUC MINAS');


-- ============================================================
-- PROFESSORES (tabela: professor)
-- Model: id, nome, cpf, email, departamento, saldoMoedas, senha
-- NÃO possui login, NÃO possui instituicao_id
-- ============================================================

INSERT INTO professor (id, nome, cpf, email, departamento, saldo_moedas, senha)
VALUES
(1, 'João Silva', '000.000.000-00', 'joao@ufmg.br', 'Engenharia Nuclear', 1000, '123'),
(2, 'Maria Souza', '111.111.111-11', 'maria@pucminas.br', 'Computação', 1000, '123');


-- ============================================================
-- EMPRESAS PARCEIRAS (tabela: empresa_parceira)
-- Model: id, nome, email, endereco, senha, cnpj
-- NÃO possui login
-- ============================================================

INSERT INTO empresa_parceira (id, nome, email, endereco, senha, cnpj)
VALUES
(1, 'Uni Lanches', 'contato@unilanches.com', 'Rua A, 123', '123', '00.000.000/0001-00'),
(2, 'BITBookstore', 'contato@bitbook.com', 'Rua B, 456', '123', '11.111.111/0001-11'),
(3, 'BITMobility', 'suporte@bitmobility.com', 'Rua C, 789', '123', '22.222.222/0001-22'),
(4, 'BITMentoria', 'mentoria@bitmentoria.com', 'Rua D, 321', '123', '33.333.333/0001-33');


-- ============================================================
-- VANTAGENS (tabela: vantagem)
-- Model real: empresa_id (FK), custo_moedas
-- ============================================================

INSERT INTO vantagem (
    id, nome, descricao, categoria,
    custo_moedas, codigo_voucher,
    limite_por_aluno, limite_mensal,
    exige_aprovacao_professor,
    foto, empresa_id
) VALUES
(1, 'Lanche 50% OFF', '50% de desconto no lanche no Uni Lanches',
 'RESTAURANTE', 300, 'BITSTUDENT50-LANCHE',
 1, 1, false,
 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png',
 1),

(2, 'Lanche 30% OFF', '30% de desconto no lanche no Uni Lanches',
 'RESTAURANTE', 200, 'BITSTUDENT30-LANCHE',
 2, 1, false,
 'https://cdn-icons-png.flaticon.com/512/1046/1046784.png',
 1),

(3, 'Lanche 10% OFF', '10% de desconto em itens selecionados',
 'RESTAURANTE', 100, 'BITSTUDENT10-LANCHE',
 NULL, NULL, false,
 'https://cdn-icons-png.flaticon.com/512/857/857681.png',
 1),

(4, 'Bebida/Doce 30% OFF', 'Desconto em bebidas e sobremesas',
 'RESTAURANTE', 150, 'BITSTUDENT30-DOCE',
 2, 2, false,
 'https://cdn-icons-png.flaticon.com/512/4151/4151066.png',
 1),

(5, '30% Mensalidade', 'Voucher de 30% de desconto na mensalidade',
 'MENSALIDADE', 800, 'BITSTUDENT30',
 1, NULL, false,
 'https://cdn-icons-png.flaticon.com/512/1688/1688400.png',
 2),

(6, 'Livro 50% OFF', '50% de desconto em livro acadêmico',
 'MATERIAL', 400, 'BITSTUDENT50-LIVRO',
 1, NULL, false,
 'https://cdn-icons-png.flaticon.com/512/3062/3062634.png',
 2),

(7, 'Curso 30% OFF', 'Desconto de 30% em curso complementar',
 'MATERIAL', 350, 'BITSTUDENT30-CURSO',
 1, NULL, false,
 'https://cdn-icons-png.flaticon.com/512/3209/3209265.png',
 2),

(8, 'Abono de Falta', 'Abono de ausência (máx. 3 por semestre)',
 'ACADEMICO', 500, 'BITSTUDENT-FALTA',
 3, NULL, false,
 'https://cdn-icons-png.flaticon.com/512/4205/4205260.png',
 4),

(9, 'Substituição de Nota', 'Solicitação de substituição de nota (sujeito à aprovação)',
 'ACADEMICO', 600, 'BITSTUDENT-NOTA',
 1, NULL, true,
 'https://cdn-icons-png.flaticon.com/512/331/331730.png',
 4),

(10, 'Bike Mobility 30% OFF', 'Desconto em mobilidade sustentável',
 'MOBILIDADE', 250, 'BITSTUDENT30-BIKE',
 4, 2, false,
 'https://cdn-icons-png.flaticon.com/512/3448/3448710.png',
 3);


-- ============================================================
-- ALUNOS (tabela: aluno)
-- Model real: instituicao é STRING
-- NÃO existe login, NÃO existe professor_id, NÃO existe instituicao_id
-- ============================================================

INSERT INTO aluno (
    id, nome, cpf, rg, email, endereco, curso,
    saldo_moedas, senha, instituicao
) VALUES
(1, 'Pedro Henrique', '222.222.222-22', 'MG-11.111.111', 'pedro@ufmg.br',
 'Rua Principal, 123 - BH', 'Engenharia Nuclear', 1000,
 '123', 'UFMG'),

(2, 'Ana Clara', '333.333.333-33', 'MG-22.222.222', 'ana@pucminas.br',
 'Av. Central, 45 - BH', 'Ciência da Computação', 800,
 '123', 'PUC MINAS');
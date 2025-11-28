-- Seed: 3 Instituicoes de Ensino (usado para testes)
INSERT INTO instituicao_ensino (id, nome) VALUES (1, 'Universidade Exemplo');
INSERT INTO instituicao_ensino (id, nome) VALUES (2, 'Instituto Técnico Central');
INSERT INTO instituicao_ensino (id, nome) VALUES (3, 'Faculdade Estadual de Tecnologia');

-- Observação: deixe o JPA/Hibernate criar o schema (spring.jpa.hibernate.ddl-auto=update) e
-- a propriedade spring.jpa.defer-datasource-initialization=true garante que este script
-- será executado após o schema ser criado.

-- Seed adicional para testes: um professor, um aluno, uma empresa parceira e uma vantagem
-- As colunas seguem o padrão de nomes gerado pelo Hibernate (snake_case)
-- SENHA DE TODOS OS USUÁRIOS: "senha123" (criptografada com BCrypt)
INSERT INTO professor (id, nome, email, cpf, login, senha, departamento, saldo_moedas) VALUES (1, 'Prof. Teste', 'prof@test.com', '11122233344', 'profteste', '$2a$10$NRTXu2XusuBhMXQm3lWFPOGBHnhc50iR/q.moEg3jUgVcRfA0D4KO', 'CIÊNCIAS', 100);

INSERT INTO aluno (id, nome, email, cpf, login, senha, rg, endereco, curso, saldo_moedas, instituicao_id) VALUES (1, 'Aluno Teste', 'aluno@test.com', '55566677788', 'alunoteste', '$2a$10$NRTXu2XusuBhMXQm3lWFPOGBHnhc50iR/q.moEg3jUgVcRfA0D4KO', '12345678', 'Rua Exemplo, 100', 'Engenharia', 10, 1);

INSERT INTO empresa_parceira (id, nome, email, login, senha) VALUES (1, 'Parceira Teste', 'parceira@test.com', 'parceirateste', '$2a$10$NRTXu2XusuBhMXQm3lWFPOGBHnhc50iR/q.moEg3jUgVcRfA0D4KO');

INSERT INTO vantagem (id, descricao, custo_em_moedas, foto, empresa_parceira_id) VALUES (1, 'Café grátis', 5, NULL, 1);

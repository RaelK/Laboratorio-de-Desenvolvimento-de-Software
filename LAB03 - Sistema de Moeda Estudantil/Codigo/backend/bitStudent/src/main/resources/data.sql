-- Seed: 3 Instituicoes de Ensino (usado para testes)
INSERT INTO instituicao_ensino (id, nome) VALUES (1, 'Universidade Exemplo');
INSERT INTO instituicao_ensino (id, nome) VALUES (2, 'Instituto Técnico Central');
INSERT INTO instituicao_ensino (id, nome) VALUES (3, 'Faculdade Estadual de Tecnologia');

-- Observação: deixe o JPA/Hibernate criar o schema (spring.jpa.hibernate.ddl-auto=update) e
-- a propriedade spring.jpa.defer-datasource-initialization=true garante que este script
-- será executado após o schema ser criado.

-- =========================
-- USUÁRIOS (login web)
-- =========================
-- Senha: 123 (BCrypt)
INSERT INTO usuarios (id, username, password, role, enabled)
SELECT 1, 'cliente@loccar.com',
       '{bcrypt}$2a$10$y3eJp8cQVHk3p6s7o0d7eO1X3oGZkFdvzTq7VYb0y0m7P3k9y5v3a',
       'ROLE_CLIENTE', true
WHERE NOT EXISTS (SELECT 1 FROM usuarios WHERE id = 1);

INSERT INTO usuarios (id, username, password, role, enabled)
SELECT 2, 'agente@loccar.com',
       '{bcrypt}$2a$10$y3eJp8cQVHk3p6s7o0d7eO1X3oGZkFdvzTq7VYb0y0m7P3k9y5v3a',
       'ROLE_AGENTE', true
WHERE NOT EXISTS (SELECT 1 FROM usuarios WHERE id = 2);

-- =========================
-- CLIENTES
-- =========================
INSERT INTO clientes (id, nome, cpf, cnh, cidade, estado)
SELECT 1, 'João Cliente', '111.111.111-11', '99999999999', 'Belo Horizonte', 'MG'
WHERE NOT EXISTS (SELECT 1 FROM clientes WHERE id = 1);

-- =========================
-- VEÍCULOS
-- =========================
INSERT INTO veiculos (id, marca, modelo, ano, placa, status)
SELECT 1, 'Toyota', 'Corolla', 2022, 'ABC1D23', 'FROTA_DISPONIVEL'
WHERE NOT EXISTS (SELECT 1 FROM veiculos WHERE placa = 'ABC1D23');

INSERT INTO veiculos (id, marca, modelo, ano, placa, status)
SELECT 2, 'Fiat', 'Argo', 2022, 'XYZ1234', 'FROTA_DISPONIVEL'
WHERE NOT EXISTS (SELECT 1 FROM veiculos WHERE placa = 'XYZ1234');

INSERT INTO veiculos (id, marca, modelo, ano, placa, status)
SELECT 3, 'Hyundai', 'Creta', 2021, 'HJK9A87', 'MANUTENCAO'
WHERE NOT EXISTS (SELECT 1 FROM veiculos WHERE placa = 'HJK9A87');
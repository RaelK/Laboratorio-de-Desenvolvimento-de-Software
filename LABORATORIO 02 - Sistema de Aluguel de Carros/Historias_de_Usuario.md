# Histórias de Usuário — Sistema de Aluguel de Carros

## US01 – Cadastro
**Como** visitante  
**Quero** cadastrar-me com dados pessoais (RG, CPF, nome, endereço, profissão)  
**Para** usar o sistema.  
**Critérios de aceite:**
- Validação de CPF e RG
- Campos obrigatórios
- Confirmação por mensagem
- Dados armazenados com segurança

---

## US02 – Autenticação
**Como** usuário  
**Quero** entrar com e-mail/senha  
**Para** acessar minhas funcionalidades.  
**Critérios de aceite:**
- Credenciais corretas
- Feedback de erro em caso de falha
- Sessão segura e expirada por inatividade
- Logout disponível

---

## US03 – Criar Pedido de Aluguel
**Como** cliente  
**Quero** criar um pedido de aluguel informando automóvel, datas e condições  
**Para** solicitar avaliação.  
**Critérios de aceite:**
- Status inicial: “Em Análise”
- Associado a um cliente autenticado
- Associado a um automóvel disponível
- Datas de início e fim válidas

---

## US04 – Consultar Pedido de Aluguel
**Como** cliente  
**Quero** visualizar meus pedidos de aluguel e seus status  
**Para** acompanhar o andamento do processo.  
**Critérios de aceite:**
- Listagem de pedidos do cliente autenticado
- Filtro por status e datas
- Exibição de detalhes do pedido

---

## US05 – Modificar Pedido de Aluguel
**Como** cliente  
**Quero** alterar um pedido de aluguel pendente  
**Para** corrigir informações.  
**Critérios de aceite:**
- Permitido apenas se status = “Em Análise” ou “Em Ajuste”
- Histórico de alterações registrado
- Atualização não pode afetar contratos já gerados

---

## US06 – Cancelar Pedido de Aluguel
**Como** cliente  
**Quero** cancelar um pedido de aluguel  
**Para** desistir do aluguel.  
**Critérios de aceite:**
- Permitido apenas se status ≠ “Contrato Gerado”
- Pedido marcado como “Cancelado”
- Histórico da operação registrado

---

## US07 – Análise Financeira do Pedido
**Como** agente (empresa ou banco)  
**Quero** avaliar financeiramente um pedido de aluguel  
**Para** decidir se ele será aprovado.  
**Critérios de aceite:**
- Registro da data e agente responsável
- Campos para parecer (Aprovado/Reprovado/Em Ajuste)
- Campo de comentários/observações
- Alteração do status do pedido conforme resultado

---

## US08 – Emitir Parecer
**Como** agente  
**Quero** emitir e publicar um parecer sobre o pedido de aluguel  
**Para** prosseguir com o processo de contratação.  
**Critérios de aceite:**
- Mudança automática do status do pedido
- Registro no histórico do pedido
- Apenas agentes autorizados podem emitir parecer

---

## US09 – Gerar Contrato de Aluguel
**Como** agente  
**Quero** gerar o contrato de aluguel com base no pedido aprovado  
**Para** formalizar a locação.  
**Critérios de aceite:**
- Status do pedido muda para “Contrato Gerado”
- Associação do contrato ao pedido
- Registro da data de início e fim da vigência
- Identificação do tipo de proprietário (Cliente, Empresa ou Banco)

---

## US10 – Associar Contrato de Crédito
**Como** agente (banco)  
**Quero** associar um contrato de crédito a um aluguel  
**Para** viabilizar o pagamento parcelado.  
**Critérios de aceite:**
- Apenas agentes do tipo banco podem criar
- Associação a um contrato de aluguel existente
- Registro da taxa de juros, parcelas e limite de crédito
- Validação de dados financeiros

---

## US11 – Registrar Automóvel
**Como** administrador  
**Quero** cadastrar automóveis com matrícula, ano, marca, modelo e placa  
**Para** disponibilizá-los para aluguel.  
**Critérios de aceite:**
- Placa única
- Todos os campos obrigatórios
- Automóvel inicialmente marcado como “Disponível”
- Validação de formato da placa

---

## US12 – Registrar Empregadores e Rendimentos
**Como** cliente  
**Quero** registrar até 3 empregadores e seus rendimentos mensais  
**Para** compor minha análise financeira.  
**Critérios de aceite:**
- No máximo 3 registros por cliente
- Nome da entidade empregadora obrigatório
- Valor de renda deve ser positivo
- Dados ficam vinculados ao cliente autenticado

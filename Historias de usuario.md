# Sistema de Moeda Estudantil – Histórias de Usuário

## Aluno(a)

### US-AL-01 — Cadastro de aluno (Must)
Como aluno, quero me cadastrar informando nome, e-mail, CPF, RG, endereço, instituição e curso, para poder usar o sistema.  
**Critérios de aceite:**
- Deve selecionar instituição a partir de lista pré-cadastrada.
- CPF/RG/e-mail validados (formato e unicidade de e-mail/CPF).
- Recebo confirmação de criação de conta.

### US-AL-02 — Autenticar-se (Must)
Como aluno, quero fazer login com e-mail e senha, para acessar minha conta.  
**Critérios de aceite:**
- Autenticação obrigatória para acessar funcionalidades.
- Erros claros para credenciais inválidas.

### US-AL-03 — Ver saldo e extrato (Must)
Como aluno, quero visualizar meu saldo de moedas e o extrato de transações (recebimentos e trocas), para acompanhar meu uso.  
**Critérios de aceite:**
- Lista paginada/ordenada por data.
- Cada item mostra tipo (recebimento/troca), valor, data, origem/destino e observação/motivo.

### US-AL-04 — Notificação ao receber moedas (Must)
Como aluno, quero receber um e-mail quando eu ganhar moedas, para ser avisado imediatamente.  
**Critérios de aceite:**
- E-mail inclui quantidade, professor remetente, data e mensagem do reconhecimento.

### US-AL-05 — Listar vantagens (Must)
Como aluno, quero listar as vantagens disponíveis com descrição, custo em moedas e foto, para escolher o que resgatar.  
**Critérios de aceite:**
- Pode filtrar por categoria/empresa (se houver), ordenar por custo.
- Exibe disponibilidade e custo.

### US-AL-06 — Resgatar vantagem (Must)
Como aluno, quero trocar moedas por uma vantagem selecionada, para obter produtos/descontos.  
**Critérios de aceite:**
- Bloqueia se saldo insuficiente.
- Ao confirmar, debita saldo e registra transação de troca.

### US-AL-07 — Receber cupom por e-mail (Must)
Como aluno, quero receber por e-mail um cupom com código gerado pelo sistema após o resgate, para utilizar presencialmente.  
**Critérios de aceite:**
- E-mail contém código único, descrição da vantagem, empresa parceira e instruções de uso.

### US-AL-08 — Segurança de conta (Should)
Como aluno, quero redefinir minha senha via e-mail, para recuperar o acesso com segurança.  
**Critérios de aceite:**
- Fluxo de “esqueci minha senha” com token temporário.
- Regras de senha fortes.

---

## Professor(a)

### US-PF-01 — Perfil de professor pré-cadastrado (Must)
Como professor, quero ter meu perfil pré-cadastrado com nome, CPF, departamento e instituição, para que a instituição controle quem pode distribuir moedas.  
**Critérios de aceite:**
- Professor está vinculado a uma instituição existente.
- Não é possível alterar a instituição sem permissão administrativa.

### US-PF-02 — Autenticar-se (Must)
Como professor, quero fazer login com e-mail/senha, para acessar minhas funções de distribuição.  
**Critérios de aceite:**
- Autenticação obrigatória.
- Mensagens claras em caso de erro.

### US-PF-03 — Receber alocação semestral (Must)
Como professor, quero receber automaticamente 1.000 moedas a cada semestre, acumulando com meu saldo, para distribuir aos alunos.  
**Critérios de aceite:**
- A cada semestre, +1.000 são adicionadas ao saldo corrente.
- Histórico registra a alocação com data/semestre.

### US-PF-04 — Enviar moedas a aluno (Must)
Como professor, quero enviar moedas a um aluno selecionado com uma mensagem de reconhecimento, para premiar mérito.  
**Critérios de aceite:**
- Exige saldo suficiente.
- Campo de mensagem obrigatório.
- Registra transação com aluno destino, quantidade, mensagem e data.
- Dispara notificação por e-mail ao aluno.

### US-PF-05 — Consultar saldo e extrato (Must)
Como professor, quero visualizar meu saldo e o extrato de envios, para acompanhar minha distribuição.  
**Critérios de aceite:**
- Lista de transações com aluno, quantidade, mensagem e data.
- Ordenação por data e filtros básicos.

### US-PF-06 — Buscar aluno (Should)
Como professor, quero buscar alunos por nome/e-mail/CPF dentro da minha instituição, para agilizar a distribuição.  
**Critérios de aceite:**
- Autocompletar/lookup limitado à instituição do professor.

---

## Empresa Parceira

### US-EP-01 — Cadastro de empresa parceira (Must)
Como empresa parceira, quero me cadastrar informando dados da empresa e responsável, para oferecer vantagens no sistema.  
**Critérios de aceite:**
- Campos mínimos (razão social/nome fantasia, CNPJ, e-mail responsável).
- E-mail de confirmação de conta.

### US-EP-02 — Autenticar-se (Must)
Como empresa parceira, quero fazer login com e-mail/senha, para gerenciar minhas vantagens.  
**Critérios de aceite:**
- Autenticação obrigatória.

### US-EP-03 — Cadastrar vantagem (Must)
Como empresa parceira, quero cadastrar vantagens com descrição, foto e custo em moedas, para disponibilizá-las aos alunos.  
**Critérios de aceite:**
- Upload de imagem/foto.
- Custo em moedas obrigatório (inteiro positivo).
- Status da vantagem (ativa/inativa).

### US-EP-04 — Receber e-mail de resgate com código (Must)
Como empresa parceira, quero receber um e-mail quando um aluno resgatar uma vantagem minha, contendo um código único, para conferir o uso presencial.  
**Critérios de aceite:**
- E-mail inclui código, identificação do aluno, descrição da vantagem, data e instruções de conferência.

### US-EP-05 — Consultar resgates (Should)
Como empresa parceira, quero ver uma lista de resgates das minhas vantagens, para controle interno.  
**Critérios de aceite:**
- Lista com data, código, status (pendente/utilizado) e vantagem correspondente.

---

## Requisitos Transversais

### US-AU-01 — Criar conta e gerenciar senha (Must)
Como usuário (aluno/professor/empresa), quero criar conta (quando aplicável) e gerenciar minha senha, para acessar com segurança.  
**Critérios de aceite:**
- Criação, login, logout, redefinição de senha por e-mail.
- Senhas armazenadas com hash seguro.

### US-NT-01 — Envio de e-mails do sistema (Must)
Como usuário, quero receber e-mails transacionais (confirmações, recebimento de moedas, cupons), para ser informado de eventos relevantes.  
**Critérios de aceite:**
- Templates distintos: confirmação de cadastro, recebimento de moedas, cupom de resgate e aviso ao parceiro.
- Inclui código único no caso de cupons.

### US-CD-01 — Código único de resgate (Must)
Como sistema, quero gerar um código único por resgate, para facilitar a conferência pela empresa parceira.  
**Critérios de aceite:**
- Código é único, não previsível e associado à transação de resgate.
- Código aparece no e-mail do aluno e da empresa.

---

## Governança de Dados e Regras de Negócio

### US-RN-01 — Vincular professor à instituição (Must)
Como sistema, quero garantir que todo professor esteja explicitamente vinculado a uma instituição, para manter a integridade das distribuições.  
**Critérios de aceite:**
- Toda transação de envio registra a instituição do professor.
- Professor não envia moedas a alunos de outra instituição.

### US-RN-02 — Restrições de saldo (Must)
Como sistema, quero impedir transações que excedam o saldo do professor ou do aluno, para manter consistência financeira.  
**Critérios de aceite:**
- Validação atômica no momento da transação.
- Mensagens claras de erro.

### US-RN-03 — Histórico auditável (Should)
Como sistema, quero manter histórico auditável de alocações semestrais, envios e resgates, para rastreabilidade.  
**Critérios de aceite:**
- Cada registro contém data/hora, valores, partes envolvidas e identificadores.

---

## Exploração (Opcional)

### US-QV-01 — Filtro/Busca no extrato (Could)
Como usuário, quero filtrar o extrato por período e tipo de transação, para encontrar lançamentos específicos.  
**Critérios de aceite:**
- Filtros por data e tipo (recebimento/envio/resgate).

### US-QV-02 — Detalhe da transação (Could)
Como usuário, quero abrir o detalhe de uma transação, para ver informações completas (mensagem, código, envolvidos).  
**Critérios de aceite:**
- Modal/página de detalhe com todos os campos relevantes.

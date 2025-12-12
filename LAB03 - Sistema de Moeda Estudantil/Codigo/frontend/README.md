# 🪙 bitStudent — Frontend (Lab03S02)

Frontend React + TypeScript com Tailwind, responsivo e **integrado ao backend** bitStudent.
Inclui CRUDs de **Alunos** e **Empresas Parceiras** com payloads alinhados aos DTOs do backend.

## Como rodar
```bash
cp .env.example .env      # ajuste a URL se necessário
npm install
npm run dev
```
Acesse http://localhost:5173

## Endpoints esperados
- Alunos:     GET/POST /alunos, GET/PUT/DELETE /alunos/{id}
- Empresas:   GET/POST /empresas, GET/PUT/DELETE /empresas/{id}
- Instituições (opcional): GET /instituicoes  (se 404, o front usa fallback 1..3 do data.sql)

## Observações
- Para **AlunoCreateDTO**, o front envia `instituicaoEnsino: { id }` conforme seu backend.
- Campos de senha aparecem nos formulários (Aluno, Empresa) apenas para criação/edição conforme necessário.

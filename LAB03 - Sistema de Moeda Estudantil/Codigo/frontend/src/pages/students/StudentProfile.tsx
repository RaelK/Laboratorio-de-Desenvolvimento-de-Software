import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStudent } from "../../api/students";
import type { Aluno } from "../../types";
import StudentIDCard from "../../components/StudentIDCard";

export default function StudentProfile() {
  const { id } = useParams();
  const [aluno, setAluno] = useState<Aluno | null>(null);

  useEffect(() => {
    (async () => setAluno(await getStudent(id!)))();
  }, [id]);

  if (!aluno) return <div className="card">Carregando...</div>;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="card">
        <div className="text-xl font-bold mb-4">Carteira Estudantil</div>
        <StudentIDCard
          aluno={{
            ...aluno,
            registro: `${String(aluno.id).padStart(4, "0")}-9999-10`,
            validade: "11/12/2026",
            situacao: "ATIVO",
          }}
        />
      </div>

      {/* Painel de dados básicos ao lado (opcional) */}
      <div className="card">
        <div className="text-xl font-bold mb-4">Dados do Aluno</div>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
          <div><dt className="text-white/60">Nome</dt><dd>{aluno.nome}</dd></div>
          <div><dt className="text-white/60">Email</dt><dd>{aluno.email}</dd></div>
          <div><dt className="text-white/60">CPF</dt><dd>{aluno.cpf}</dd></div>
          <div><dt className="text-white/60">Curso</dt><dd>{aluno.curso}</dd></div>
          <div><dt className="text-white/60">Instituição</dt><dd>{aluno.instituicaoEnsino?.nome}</dd></div>
          <div><dt className="text-white/60">Saldo</dt><dd>{aluno.saldoMoedas}</dd></div>
        </dl>
      </div>
    </div>
  );
}
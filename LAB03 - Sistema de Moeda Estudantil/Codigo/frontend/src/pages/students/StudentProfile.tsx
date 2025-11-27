import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStudent } from "../../api/students";
import type { Aluno } from "../../types";
import StudentIDCard from "../../components/StudentIDCard";
import DynamicBackground from "../../components/DynamicBackground";

export default function StudentProfile() {
  const { id } = useParams();
  const [aluno, setAluno] = useState<Aluno | null>(null);

  useEffect(() => {
    (async () => setAluno(await getStudent(id!)))();
  }, [id]);

  if (!aluno)
    return (
      <>
        <DynamicBackground query="university students, college campus" />
        <div className="flex justify-center items-center min-h-screen px-4">
          <div className="card">Carregando...</div>
        </div>
      </>
    );

  return (
    <>
      {/* Fundo de alunos para a tela da carteirinha */}
      <DynamicBackground query="university students, student id card, campus" />

      <div className="flex justify-center items-center min-h-screen px-4">
        <StudentIDCard
          aluno={{
            ...aluno,
            registro: `${String(aluno.id).padStart(4, "0")}-9999-10`,
            validade: "11/12/2026",
            situacao: "ATIVO",
          }}
        />
      </div>
    </>
  );
}
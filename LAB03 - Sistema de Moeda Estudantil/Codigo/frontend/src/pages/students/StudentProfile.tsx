import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StudentIDCard from "../../components/StudentIDCard";
import { getStudent } from "../../api/students";

export default function StudentProfile() {
  const { id } = useParams();
  const [aluno, setAluno] = useState<any | null>(null);

  useEffect(() => {
    (async () => setAluno(await getStudent(id!)))();
  }, [id]);

  if (!aluno)
    return (
      <>
        <div className="chalkboard"></div>
        <div className="flex justify-center items-center min-h-screen">
          <div className="card">Carregando...</div>
        </div>
      </>
    );

  return (
    <>
      {/* Fundo quadro ocupando a tela toda */}
      <div className="chalkboard"></div>

      {/* Centralização perfeita considerando o header */}
      <div className="relative flex justify-center items-center min-h-screen px-4 mt-12">

        {/* Wrapper responsivo da carteirinha */}
        <div className="
          w-[340px]
          sm:w-[370px]
          md:w-[420px]
          lg:w-[480px]
          xl:w-[520px]
        ">
          <StudentIDCard
            aluno={{
              ...aluno,
              registro: `${String(aluno.id).padStart(4, "0")}-9999`,
              validade: "12/2030",
              situacao: "ATIVO",
            }}
          />
        </div>

      </div>
    </>
  );
}
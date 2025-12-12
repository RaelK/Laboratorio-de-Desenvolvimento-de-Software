import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { createStudent, getStudent, updateStudent } from "../../api/students";
import { listInstitutions, type InstituicaoEnsino } from "../../api/institutions";
import type { AlunoCreate, Aluno } from "../../types";

// ========= VALIDAÇÃO ==========
const schema = z.object({
  nome: z.string().min(3),
  email: z.string().email(),
  cpf: z.string().min(11),
  login: z.string().min(3),
  senha: z.string().optional(),
  rg: z.string().min(3),
  endereco: z.string().min(3),
  curso: z.string().min(2),
  instituicaoId: z.coerce.number().min(1),
});

type FormData = z.infer<typeof schema>;

export default function StudentsForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [instituicoes, setInstituicoes] = useState<InstituicaoEnsino[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: "",
      email: "",
      cpf: "",
      login: "",
      senha: "",
      rg: "",
      endereco: "",
      curso: "",
      instituicaoId: 0,
    },
  });

  // ========= CARREGAR INSTITUIÇÕES + EDITAR ==========
  useEffect(() => {
    (async () => {
      const insts = await listInstitutions();
      setInstituicoes(insts);

      if (isEdit) {
        const data: Aluno = await getStudent(id!);

        // Converter o nome da instituição (string vinda do backend) → id
        const instMatch = insts.find(
          (i) => i.nome.toLowerCase().trim() === data.instituicao.toLowerCase().trim()
        );

        reset({
          nome: data.nome,
          email: data.email,
          cpf: data.cpf,
          login: data.login,
          senha: "",
          rg: data.rg,
          endereco: data.endereco,
          curso: data.curso,
          instituicaoId: instMatch?.id ?? 0,
        });
      }
    })();
  }, [id]);

  // ========= MONTAR PAYLOAD FINAL ==========
  function toPayload(v: FormData): AlunoCreate {
    return {
      nome: v.nome,
      email: v.email,
      cpf: v.cpf,
      login: v.login,
      senha: v.senha || "",
      rg: v.rg,
      endereco: v.endereco,
      curso: v.curso,
      saldoMoedas: 0,

      // backend recebe APENAS STRING
      instituicao: instituicoes.find((i) => i.id === v.instituicaoId)?.nome ?? "",
    };
  }

  // ========= SUBMIT ==========
  async function onSubmit(values: FormData) {
    const payload = toPayload(values);

    try {
      if (isEdit) {
        await updateStudent(id!, payload);
        toast.info("Aluno atualizado com sucesso!");
        navigate(`/alunos/${id}/carteira`);
      } else {
        const created = await createStudent(payload);
        toast.success("Aluno criado com sucesso!");
        navigate(`/alunos/${created.id}/carteira`);
      }
    } catch {
      toast.error("Erro ao salvar aluno.");
    }
  }

  // ========= TEMPLATE ==========
  return (
    <>
      <div
        className="fixed inset-0 bg-cover bg-center -z-10 brightness-60"
        style={{ backgroundImage: "url('/images/alunosuniversitarios.jpg')" }}
      />

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="card">
          <div className="text-xl font-bold mb-4">
            {isEdit ? "Editar Aluno" : "Novo Aluno"}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label">Nome</label>
              <input className="input" {...register("nome")} />
              <small className="text-red-400">{errors.nome?.message}</small>
            </div>

            <div>
              <label className="label">Email</label>
              <input className="input" {...register("email")} />
              <small className="text-red-400">{errors.email?.message}</small>
            </div>

            <div>
              <label className="label">CPF</label>
              <input className="input" {...register("cpf")} />
              <small className="text-red-400">{errors.cpf?.message}</small>
            </div>

            <div>
              <label className="label">RG</label>
              <input className="input" {...register("rg")} />
              <small className="text-red-400">{errors.rg?.message}</small>
            </div>

            <div>
              <label className="label">Login</label>
              <input className="input" {...register("login")} />
              <small className="text-red-400">{errors.login?.message}</small>
            </div>

            <div>
              <label className="label">
                Senha {isEdit && <span className="text-white/60">(opcional)</span>}
              </label>
              <input type="password" className="input" {...register("senha")} />
            </div>

            <div>
              <label className="label">Endereço</label>
              <input className="input" {...register("endereco")} />
              <small className="text-red-400">{errors.endereco?.message}</small>
            </div>

            <div>
              <label className="label">Curso</label>
              <input className="input" {...register("curso")} />
              <small className="text-red-400">{errors.curso?.message}</small>
            </div>

            <div>
              <label className="label">Instituição de Ensino</label>
              <select className="input" {...register("instituicaoId")}>
                <option value={0}>Selecione...</option>
                {instituicoes.map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.nome}
                  </option>
                ))}
              </select>
              <small className="text-red-400">{errors.instituicaoId?.message}</small>
            </div>

            <div className="md:col-span-2 flex justify-end gap-2">
              <button
                type="button"
                className="btn"
                onClick={() => navigate("/alunos/vantagens")}
              >
                Cancelar
              </button>

              <button className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
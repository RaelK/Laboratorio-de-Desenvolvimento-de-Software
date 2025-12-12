import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  getProfessor,
  createProfessor,
  updateProfessor
} from "../../api/professors";

import type { Professor, ProfessorCreate } from "../../types";

const schema = z.object({
  nome: z.string().min(3),
  email: z.string().email(),
  departamento: z.string().min(3),
  senha: z.string().optional()
});

type FormData = z.infer<typeof schema>;

export default function ProfessorForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: "",
      email: "",
      departamento: "",
      senha: ""
    }
  });

  useEffect(() => {
    if (!isEdit) return;

    (async () => {
      const data: Professor = await getProfessor(id!);

      reset({
        nome: data.nome,
        email: data.email,
        departamento: data.departamento,
        senha: ""
      });
    })();
  }, [id]);

  async function onSubmit(values: FormData) {
    const payload: ProfessorCreate = {
      nome: values.nome,
      email: values.email,
      departamento: values.departamento,
      senha: values.senha || ""
    };

    try {
      if (isEdit) {
        await updateProfessor(Number(id), payload);
        toast.info("Professor atualizado com sucesso!");
      } else {
        await createProfessor(payload);
        toast.success("Professor cadastrado com sucesso!");
      }

      navigate("/professores/painel");
    } catch {
      toast.error("Erro ao salvar professor");
    }
  }

  return (
    <div className="card max-w-xl mx-auto mt-10 p-8">
      <h1 className="text-xl font-bold mb-6">
        {isEdit ? "Editar Professor" : "Novo Professor"}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
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
          <label className="label">Departamento</label>
          <input className="input" {...register("departamento")} />
          <small className="text-red-400">{errors.departamento?.message}</small>
        </div>

        <div>
          <label className="label">Senha {isEdit && "(opcional)"}</label>
          <input type="password" className="input" {...register("senha")} />
        </div>

        <div className="flex justify-end gap-3">
          <button type="button" className="btn" onClick={() => navigate("/professores/painel")}>
            Cancelar
          </button>
          <button className="btn btn-primary" disabled={isSubmitting}>
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
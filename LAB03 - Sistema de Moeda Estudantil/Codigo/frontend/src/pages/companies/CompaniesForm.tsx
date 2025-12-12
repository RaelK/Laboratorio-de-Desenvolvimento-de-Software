import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  createCompany,
  getCompany,
  updateCompany,
  deleteCompany
} from "../../api/companies";

import type { EmpresaParceira, EmpresaCreate } from "../../types";

const schema = z.object({
  nome: z.string().min(3),
  email: z.string().email(),
  senha: z.string().optional(),
  cnpj: z.string().optional(),
  endereco: z.string().optional()
});

type FormData = z.infer<typeof schema>;

export default function CompaniesForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { nome: "", email: "", senha: "", endereco: "", cnpj: "" }
  });

  useEffect(() => {
    if (!isEdit) return;

    (async () => {
      const data: EmpresaParceira = await getCompany(Number(id));

      reset({
        nome: data.nome,
        email: data.email,
        endereco: data.endereco ?? "",
        cnpj: data.cnpj ?? "",
        senha: ""
      });
    })();
  }, [id]);

  async function handleExcluir() {
    if (!window.confirm("Deseja realmente excluir esta empresa?")) return;

    await deleteCompany(Number(id));
    toast.info("Conta excluída.");
    navigate("/login");
  }

  async function onSubmit(values: FormData) {
    const payload: EmpresaCreate = {
      nome: values.nome,
      email: values.email,
      senha: values.senha || "",
      endereco: values.endereco,
      cnpj: values.cnpj
    };

    try {
      if (isEdit) {
        await updateCompany(Number(id), payload);
        toast.info("Empresa atualizada com sucesso!");
      } else {
        await createCompany(payload);
        toast.success("Empresa cadastrada com sucesso!");
      }

      navigate("/empresas/enviar");
    } catch {
      toast.error("Erro ao salvar empresa");
    }
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-cover bg-center -z-10 brightness-50"
        style={{ backgroundImage: "url('/images/apertodemao.jpg')" }}
      />

      <div className="card max-w-2xl mx-auto mt-12 p-8">
        <h1 className="text-xl font-bold mb-6">
          {isEdit ? "Editar Empresa" : "Nova Empresa"}
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
            <label className="label">CNPJ</label>
            <input className="input" {...register("cnpj")} />
          </div>

          <div>
            <label className="label">Endereço</label>
            <input className="input" {...register("endereco")} />
          </div>

          <div>
            <label className="label">Senha {isEdit && "(opcional)"}</label>
            <input type="password" className="input" {...register("senha")} />
          </div>

          <div className="flex justify-between pt-4">
            {isEdit && (
              <button
                type="button"
                className="btn bg-red-600 hover:bg-red-700 text-white"
                onClick={handleExcluir}
              >
                Excluir Conta
              </button>
            )}

            <button className="btn btn-primary ml-auto" disabled={isSubmitting}>
              Salvar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
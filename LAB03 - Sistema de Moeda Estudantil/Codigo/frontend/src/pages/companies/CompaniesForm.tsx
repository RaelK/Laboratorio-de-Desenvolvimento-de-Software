import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createCompany, getCompany, updateCompany } from '../../api/companies'
import type { EmpresaCreate, EmpresaParceira } from '../../types'
import CompanyChargePanel from '../../components/CompanyChargePanel'

const schema = z.object({
  nome: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  login: z.string().min(3, 'O login deve ter pelo menos 3 caracteres'),
  senha: z.string().min(3, 'A senha deve ter pelo menos 3 caracteres').optional().or(z.literal('')),
})

type FormData = z.infer<typeof schema>

export default function CompaniesForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { nome: '', email: '', login: '', senha: '' },
  })

  useEffect(() => {
    (async () => {
      if (isEdit) {
        const data: EmpresaParceira = await getCompany(id!)
        reset({ nome: data.nome, email: data.email, login: data.login, senha: '' })
      }
    })()
  }, [id, isEdit, reset])

  function toPayload(v: FormData): EmpresaCreate {
    return { nome: v.nome, email: v.email, login: v.login, senha: v.senha ?? '' }
  }

  async function onSubmit(values: FormData): Promise<void> {
    const payload = toPayload(values)
    try {
      if (isEdit) {
        await updateCompany(id!, payload)
        toast.info('Empresa atualizada com sucesso!')
      } else {
        await createCompany(payload)
        toast.success('Empresa cadastrada com sucesso!')
      }
      navigate('/empresas')
    } catch (error) {
      console.error(error)
      toast.error('Erro ao salvar empresa. Verifique os dados e tente novamente.')
    }
  }

  return (
    <>
      {/* 🔹 FUNDO DE TELA (mesmo da lista de empresas) */}
      <div
        className="fixed inset-0 bg-cover bg-center -z-10 brightness-50"
        style={{
          backgroundImage: "url('/images/apertodemao.jpg')",
        }}
      />

      <div className="card max-w-3xl mx-auto mt-10">
        <div className="text-xl font-bold mb-4">
          {isEdit ? 'Editar Empresa' : 'Nova Empresa'}
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label">Nome</label>
            <input className="input" {...register('nome')} />
            <small className="text-red-400">{errors.nome?.message}</small>
          </div>

          <div>
            <label className="label">Email</label>
            <input className="input" {...register('email')} />
            <small className="text-red-400">{errors.email?.message}</small>
          </div>

          <div>
            <label className="label">Login</label>
            <input className="input" {...register('login')} />
            <small className="text-red-400">{errors.login?.message}</small>
          </div>

          <div>
            <label className="label">
              Senha {isEdit && <span className="text-white/50">(deixe em branco para manter)</span>}
            </label>
            <input type="password" className="input" {...register('senha')} />
            <small className="text-red-400">{errors.senha?.message}</small>
          </div>

          <div className="md:col-span-2 flex justify-end gap-2 mt-2">
            <button type="button" className="btn" onClick={() => navigate('/empresas')}>
              Cancelar
            </button>
            <button className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>

        {/* Painel de cobrança */}
        <div className="mt-6">
          <CompanyChargePanel totalAPagar={100} />
        </div>
      </div>
    </>
  )
}
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createCompany, getCompany, updateCompany } from '../../api/companies'
import type { EmpresaCreate, EmpresaParceira } from '../../types'

const schema = z.object({
  nome: z.string().min(3),
  email: z.string().email(),
  login: z.string().min(3),
  senha: z.string().min(3).optional().or(z.literal(''))
})
type FormData = z.infer<typeof schema>

export default function CompaniesForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { nome: '', email: '', login: '', senha: '' }
  })

  useEffect(() => {
    (async () => {
      if (isEdit) {
        const data: EmpresaParceira = await getCompany(id!)
        reset({ nome: data.nome, email: data.email, login: data.login, senha: '' })
      }
    })()
  }, [id])

  function toPayload(v: FormData): EmpresaCreate {
    return { nome: v.nome, email: v.email, login: v.login, senha: v.senha ?? '' }
  }

  async function onSubmit(values: FormData) {
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
    <div className="card">
      <div className="text-xl font-bold mb-4">{isEdit ? 'Editar Empresa' : 'Nova Empresa'}</div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-4">
        <div><label className="label">Nome</label><input className="input" {...register('nome')} /><small className="text-red-400">{errors.nome?.message}</small></div>
        <div><label className="label">Email</label><input className="input" {...register('email')} /><small className="text-red-400">{errors.email?.message}</small></div>
        <div><label className="label">Login</label><input className="input" {...register('login')} /><small className="text-red-400">{errors.login?.message}</small></div>
        <div><label className="label">Senha {isEdit && <span className="text-white/50">(deixe em branco para manter)</span>}</label><input type="password" className="input" {...register('senha')} /><small className="text-red-400">{errors.senha?.message}</small></div>
        <div className="md:col-span-2 flex justify-end gap-2">
          <button type="button" className="btn" onClick={() => navigate('/empresas')}>Cancelar</button>
          <button className="btn btn-primary" disabled={isSubmitting}>{isSubmitting ? 'Salvando...' : 'Salvar'}</button>
        </div>
      </form>
    </div>
  )
}
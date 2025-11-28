import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../../contexts/AuthContext'
import type { UserType } from '../../api/auth'
import { FaUserGraduate, FaChalkboardTeacher, FaBuilding, FaCoins } from 'react-icons/fa'

const schema = z.object({
  login: z.string().min(3, 'Login deve ter no mínimo 3 caracteres'),
  password: z.string().min(3, 'Senha deve ter no mínimo 3 caracteres')
})

type FormData = z.infer<typeof schema>

export default function Login() {
  const navigate = useNavigate()
  const { login: authLogin } = useAuth()
  const [userType, setUserType] = useState<UserType>('STUDENT')

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      login: '',
      password: ''
    }
  })

  async function onSubmit(values: FormData) {
    try {
      await authLogin({
        login: values.login,
        password: values.password,
        userType
      })
      
      toast.success('Login realizado com sucesso!')
      
      // Redireciona baseado no tipo de usuário
      if (userType === 'STUDENT') {
        navigate('/alunos')
      } else if (userType === 'PROFESSOR') {
        navigate('/professores/painel')
      } else {
        navigate('/empresas')
      }
    } catch (error: any) {
      toast.error(error.message || 'Erro ao fazer login')
    }
  }

  const tabs: Array<{ type: UserType; label: string; icon: typeof FaUserGraduate }> = [
    { type: 'STUDENT', label: 'Aluno', icon: FaUserGraduate },
    { type: 'PROFESSOR', label: 'Professor', icon: FaChalkboardTeacher },
    { type: 'COMPANY', label: 'Empresa', icon: FaBuilding }
  ]

  return (
    <div className="min-h-[calc(100vh-150px)] flex items-center justify-center">
      <div className="card w-full max-w-md">
        
        {/* Logo e título */}
        <div className="text-center mb-6">
          <div className="inline-flex size-16 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 items-center justify-center shadow-lg mb-3">
            <FaCoins className="text-3xl text-yellow-300" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">
            <span>bit</span>
            <span className="text-coin">Student</span>
          </h1>
          <p className="text-sm text-white/60">
            Acesse sua conta
          </p>
        </div>

        {/* Abas de tipo de usuário */}
        <div className="flex gap-2 mb-6">
          {tabs.map(({ type, label, icon: Icon }) => (
            <button
              key={type}
              type="button"
              onClick={() => setUserType(type)}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border transition ${
                userType === type
                  ? 'border-brand-500 bg-brand-600 text-white'
                  : 'border-white/10 bg-[#0b1636] text-white/60 hover:text-white hover:border-white/20'
              }`}
            >
              <Icon className="text-lg" />
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          <div>
            <label className="label">Login</label>
            <input
              {...register('login')}
              type="text"
              className="input"
              placeholder="Digite seu login"
            />
            {errors.login && (
              <p className="text-xs text-red-400 mt-1">{errors.login.message}</p>
            )}
          </div>

          <div>
            <label className="label">Senha</label>
            <input
              {...register('password')}
              type="password"
              className="input"
              placeholder="Digite sua senha"
            />
            {errors.password && (
              <p className="text-xs text-red-400 mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-full"
          >
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}

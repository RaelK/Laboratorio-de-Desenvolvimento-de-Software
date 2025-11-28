import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { LoginRequest, LoginResponse, UserType } from '../api/auth'
import { login as apiLogin } from '../api/auth'

interface AuthContextData {
  user: LoginResponse | null
  login: (credentials: LoginRequest) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<LoginResponse | null>(null)

  // Carrega dados do usuário do localStorage ao iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem('@bitStudent:user')
    const storedToken = localStorage.getItem('@bitStudent:token')
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  async function login(credentials: LoginRequest) {
    const response = await apiLogin(credentials)
    
    setUser(response)
    localStorage.setItem('@bitStudent:user', JSON.stringify(response))
    localStorage.setItem('@bitStudent:token', response.token)
  }

  function logout() {
    setUser(null)
    localStorage.removeItem('@bitStudent:user')
    localStorage.removeItem('@bitStudent:token')
  }

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

import { createContext, useContext, useEffect, useState } from "react";

export type Role = "ALUNO" | "PROFESSOR" | "EMPRESA";

export interface User {
  idUser: number;
  nome: string;
  tipoUsuario: Role;
  saldo?: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, senha: string) => Promise<boolean>;
  logout: () => void;
  register: (
    nome: string,
    email: string,
    senha: string,
    role: Role
  ) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  // Persistência do usuário automaticamente
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("tipoUsuario", user.tipoUsuario);

      if (user.tipoUsuario === "EMPRESA") {
        localStorage.setItem("empresaId", user.idUser.toString());
      }
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("tipoUsuario");
      localStorage.removeItem("empresaId");
    }
  }, [user]);

  // ================================
  // LOGIN
  // ================================
  async function login(email: string, senha: string) {
    try {
      const resp = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      if (!resp.ok) return false;

      const data = await resp.json();

      setUser(data);
      return true;
    } catch {
      return false;
    }
  }

  // ================================
  // LOGOUT
  // ================================
  function logout() {
    setUser(null);
  }

  // ================================
  // REGISTER (CADASTRO)
  // ================================
  async function register(
    nome: string,
    email: string,
    senha: string,
    role: Role
  ) {
    try {
      const resp = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          email,
          senha,
          tipo: role, // CORREÇÃO FUNDAMENTAL
        }),
      });

      if (!resp.ok) return false;

      const data = await resp.json();

      // Login automático
      setUser({
        idUser: data.id,
        nome: data.nome,
        tipoUsuario: role,
        saldo: data.saldo ?? 0,
      });

      return true;
    } catch {
      return false;
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
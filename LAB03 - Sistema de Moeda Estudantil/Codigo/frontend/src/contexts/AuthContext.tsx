import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  // Persistência
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("tipoUsuario", user.tipoUsuario);

      if (user.tipoUsuario === "EMPRESA") {
        localStorage.setItem("empresaId", String(user.idUser));
      }
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("tipoUsuario");
      localStorage.removeItem("empresaId");
    }
  }, [user]);

  // =====================
  // LOGIN
  // =====================
  async function login(email: string, senha: string): Promise<boolean> {
    try {
      const { data } = await api.post("/auth/login", { email, senha });

      setUser({
        idUser: data.idUser ?? data.id,
        nome: data.nome,
        tipoUsuario: data.tipoUsuario,
        saldo: data.saldo ?? 0,
      });

      return true;
    } catch (err) {
      console.error("Erro no login:", err);
      return false;
    }
  }

  // =====================
  // LOGOUT
  // =====================
  function logout() {
    setUser(null);
  }

  // =====================
  // REGISTER
  // =====================
  async function register(
    nome: string,
    email: string,
    senha: string,
    role: Role
  ): Promise<boolean> {
    try {
      const { data } = await api.post("/auth/register", {
        nome,
        email,
        senha,
        tipo: role,
      });

      setUser({
        idUser: data.idUser ?? data.id,
        nome: data.nome,
        tipoUsuario: role,
        saldo: data.saldo ?? 0,
      });

      return true;
    } catch (err) {
      console.error("Erro no cadastro:", err);
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

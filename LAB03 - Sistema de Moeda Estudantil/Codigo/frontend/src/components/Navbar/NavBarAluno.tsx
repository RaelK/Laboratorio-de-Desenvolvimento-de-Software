import { useAuth } from "../../contexts/AuthContext";

export default function NavBarAluno() {
  const { usuario, logout } = useAuth();

  return (
    <nav className="w-full bg-slate-900/80 backdrop-blur-lg border-b border-white/10 px-6 py-4 text-white flex justify-between items-center">
      <h1 className="text-xl font-semibold">bitStudent 🎓</h1>

      <div className="flex items-center gap-6">
        <div className="flex flex-col text-right leading-tight">
          <span className="font-semibold">{usuario?.nome}</span>
          <button className="text-sm text-emerald-400 hover:text-emerald-300">
            Editar perfil
          </button>
        </div>

        <button
          onClick={logout}
          className="px-4 py-1 bg-red-600 rounded hover:bg-red-700"
        >
          Sair
        </button>
      </div>
    </nav>
  );
}
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, Role } from "../contexts/AuthContext";
import { toast } from "react-toastify";

export default function CadastroPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [role, setRole] = useState<Role>("ALUNO");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErro("");

    const ok = await register(nome, email, senha, role);

    if (!ok) {
      setErro("Cadastro indisponível no momento.");
      toast.error("Erro ao cadastrar usuário.");
      return;
    }

    toast.success("Conta criada com sucesso!");

    // Redirecionamento direto para o cadastro completo
    if (role === "ALUNO") navigate("/alunos/novo");
    if (role === "PROFESSOR") navigate("/professores/novo");
    if (role === "EMPRESA") navigate("/empresas/novo");
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div className="video-bg-container">
        <iframe
          className="video-bg-iframe"
          src="https://www.youtube.com/embed/HPrwv0Eqocw?autoplay=1&mute=1&loop=1&controls=0&playlist=HPrwv0Eqocw"
        />
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="bg-[#0B132B]/95 border border-white/10 p-8 rounded-2xl shadow-xl"
        >
          <h2 className="text-white text-2xl font-bold text-center mb-6">
            Criar Conta
          </h2>

          <div className="grid grid-cols-3 gap-2 mb-6">
            {(["ALUNO", "PROFESSOR", "EMPRESA"] as Role[]).map((r) => (
              <button
                type="button"
                key={r}
                onClick={() => setRole(r)}
                className={`py-2 rounded font-semibold transition ${
                  role === r
                    ? "bg-yellow-400 text-black"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <input
            className="w-full bg-white text-black px-3 py-2 rounded mb-3"
            type="text"
            placeholder="Nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />

          <input
            className="w-full bg-white text-black px-3 py-2 rounded mb-3"
            type="email"
            placeholder="E-mail ou Login"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="w-full bg-white text-black px-3 py-2 rounded mb-3"
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          {erro && <p className="text-red-400 mt-2">{erro}</p>}

          <button
            type="submit"
            className="w-full bg-yellow-400 text-black py-2 rounded font-bold mt-4 hover:bg-yellow-300 transition"
          >
            Criar Conta
          </button>

          <p className="text-white text-center mt-6">
            Já possui conta?{" "}
            <span
              className="text-yellow-300 cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Entrar
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErro("");

    const ok = await login(email, senha);

    if (!ok) {
      setErro("Credenciais inválidas.");
      return;
    }

    // Carrega o usuário salvo no localStorage após login
    const usuario = JSON.parse(localStorage.getItem("user") || "{}");

    // Aguarda atualização do estado (resolve o clique duplo)
    setTimeout(() => {
      if (usuario.tipoUsuario === "ALUNO") navigate("/alunos/vantagens");
      if (usuario.tipoUsuario === "PROFESSOR") navigate("/professores/painel");
      if (usuario.tipoUsuario === "EMPRESA") navigate("/empresas/enviar");
    }, 50);
  }

  return (
    <div className="relative min-h-screen">

      {/* Fundo com vídeo */}
      <div className="video-bg-container">
        <iframe
          className="video-bg-iframe"
          src="https://www.youtube.com/embed/HPrwv0Eqocw?autoplay=1&mute=1&loop=1&controls=0&playlist=HPrwv0Eqocw"
        />
      </div>

      {/* Card de Login */}
      <div className="relative z-10 flex justify-center items-center min-h-screen px-6">

        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="
            bg-[#0B132B]/95 
            border border-white/10 
            p-8 rounded-2xl shadow-xl 
            w-full max-w-md
          "
        >
          <h1 className="text-3xl font-bold mb-6 text-white text-center">
            Entrar no bitStudent
          </h1>

          {erro && (
            <p className="bg-red-600 text-white px-3 py-2 rounded mb-4 text-center">
              {erro}
            </p>
          )}

          {/* Email */}
          <label className="block text-white mb-1">E-mail</label>
          <input
            type="email"
            name="email"
            autoComplete="off"
            className="w-full p-2 rounded bg-slate-800 text-white border border-white/20 mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Senha */}
          <label className="block text-white mb-1">Senha</label>
          <input
            type="password"
            name="password"
            autoComplete="new-password"
            className="w-full p-2 rounded bg-slate-800 text-white border border-white/20 mb-6"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded font-semibold">
            Entrar
          </button>

          <p className="text-center text-white/90 text-sm mt-4">
            Não possui conta?{" "}
            <span
              className="text-emerald-300 hover:underline cursor-pointer"
              onClick={() => navigate("/cadastro")}
            >
              Criar conta
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
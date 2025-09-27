import Navbar from "@/components/Navbar";
import Stepper from "@/components/Stepper";
import { useState } from "react";
import { Cliente } from "@/types";
import { api } from "@/api";

export default function CadastroClientePage() {
  const [c, setC] = useState<Cliente>({
    nome:"", cpf:"", cnh:"", cidade:"", estado:"", endereco:""
  });
  const onChange = (k: keyof Cliente) => (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) =>
    setC({ ...c, [k]: e.target.value });

  const salvar = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.clientes.criar(c);
    alert("Cliente cadastrado!");
  };

  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center">Cadastro de Clientes</h1>
        <p className="text-gray-600 text-center mt-2">
          Preencha o formulário com os dados do cliente para efetuar o cadastro no sistema.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <form onSubmit={salvar} className="card p-6 space-y-4">
            <div>
              <label className="label">Nome Completo</label>
              <input className="input" value={c.nome} onChange={onChange("nome")} required />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="label">CPF</label>
                <input className="input" value={c.cpf} onChange={onChange("cpf")} required />
              </div>
              <div>
                <label className="label">CNH</label>
                <input className="input" value={c.cnh} onChange={onChange("cnh")} required />
              </div>
            </div>
            <div>
              <label className="label">Endereço</label>
              <input className="input" value={c.endereco} onChange={onChange("endereco")} />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="label">Cidade</label>
                <input className="input" value={c.cidade} onChange={onChange("cidade")} />
              </div>
              <div>
                <label className="label">Estado</label>
                <select className="input" value={c.estado} onChange={onChange("estado")}>
                  <option value="">Selecione o estado</option>
                  {["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"].map(uf=>
                    <option key={uf} value={uf}>{uf}</option>
                  )}
                </select>
              </div>
            </div>
            <div className="pt-2">
              <button className="btn">Salvar</button>
            </div>
          </form>

          <div className="card p-6">
            <h2 className="font-semibold mb-4">Etapas do Processo</h2>
            <Stepper step={1}/>
          </div>
        </div>
      </main>
    </>
  );
}
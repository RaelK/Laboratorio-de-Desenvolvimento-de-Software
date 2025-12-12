export default function CompaniesList() {
  const empresas = [
    { id: 1, nome: "Uni Lanches", email: "contato@unilanches.com" },
    { id: 2, nome: "BITBookstore", email: "contato@bitbook.com" },
  ];

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Empresas Parceiras</h1>

      {empresas.map((e) => (
        <div
          key={e.id}
          className="bg-slate-900 p-4 rounded border border-white/10 mb-3"
        >
          <h2 className="font-semibold">{e.nome}</h2>
          <p className="text-white/60">{e.email}</p>
        </div>
      ))}
    </div>
  );
}
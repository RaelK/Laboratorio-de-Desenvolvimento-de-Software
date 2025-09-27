export default function Stepper({ step=1 }: { step?: number }) {
  const items = [
    "Recebimento de Documentos",
    "Conferência",
    "Cadastro",
    "Confirmação"
  ];
  return (
    <ol className="space-y-3">
      {items.map((label, i)=>(
        <li key={label} className="flex items-start gap-3">
          <span className={`mt-0.5 h-6 w-6 rounded-full text-xs flex items-center justify-center
            ${i<step ? "bg-brand-600 text-white":"bg-gray-200 text-gray-600"}`}>{i+1}</span>
          <div>
            <div className="font-medium">{label}</div>
            <div className="text-xs text-gray-500">Descrição da etapa</div>
          </div>
        </li>
      ))}
    </ol>
  );
}
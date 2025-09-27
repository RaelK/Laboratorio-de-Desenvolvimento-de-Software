import { Wrench, CheckCircle2, Pencil, Trash2 } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { Veiculo } from "@/types";

export default function VehicleCard({ v, onDisponibilizar }: {
  v: Veiculo; onDisponibilizar: (id:number)=>void;
}) {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{v.modelo}</h3>
        <StatusBadge status={v.status}/>
      </div>
      <div className="mt-2 text-sm text-gray-600 space-y-1">
        <div>Placa: <strong>{v.placa}</strong></div>
        <div>Ano: {v.ano}</div>
        {/* Última manutenção: N/A (exemplo) */}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <button className="btn !bg-white !text-gray-700 !border !border-gray-200 hover:shadow">
          <Wrench size={16}/> Manutenção
        </button>
        <button
          onClick={() => onDisponibilizar(v.id)}
          className="btn">
          <CheckCircle2 size={16}/> Disponibilizar
        </button>
        <div className="flex gap-2">
          <button className="btn !bg-white !text-gray-700 !border !border-gray-200 px-3"><Pencil size={16}/></button>
          <button className="btn !bg-rose-600 hover:!bg-rose-700 px-3"><Trash2 size={16}/></button>
        </div>
      </div>
    </div>
  );
}
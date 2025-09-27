import { StatusVeiculo } from "@/types";
const map: Record<StatusVeiculo,string> = {
  FROTA_DISPONIVEL: "bg-emerald-100 text-emerald-700",
  ALUGADO: "bg-amber-100 text-amber-700",
  MANUTENCAO: "bg-rose-100 text-rose-700"
};
export default function StatusBadge({ status }: { status: StatusVeiculo }) {
  return <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${map[status]}`}>{status.replace("_"," ")}</span>;
}
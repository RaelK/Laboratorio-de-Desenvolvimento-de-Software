import Navbar from "@/components/Navbar";
import VehicleCard from "@/components/VehicleCard";
import { api } from "@/api";
import { useEffect, useState } from "react";
import { Veiculo } from "@/types";

export default function VeiculosPage() {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const load = async () => setVeiculos(await api.veiculos.list());
  useEffect(()=>{ load(); },[]);
  const disponibilizar = async (id:number)=>{ await api.veiculos.disponiblizar(id); await load(); };

  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Gestão de Veículos</h1>
          <a href="/veiculos/novo" className="btn">+ Novo Veículo</a>
        </div>
        <p className="text-gray-600 mt-2">Gerencie sua frota de veículos e acompanhe manutenções</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
          {veiculos.map(v => (
            <VehicleCard key={v.id} v={v} onDisponibilizar={disponibilizar}/>
          ))}
        </div>
      </main>
    </>
  );
}
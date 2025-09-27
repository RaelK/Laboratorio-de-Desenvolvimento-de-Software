import { Car, Users2, ClipboardList } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

export default function Navbar() {
  const { pathname } = useLocation();
  const item = (to: string, icon: JSX.Element, label: string) => (
    <Link to={to}
      className={clsx("px-3 py-2 rounded-xl hover:bg-white hover:shadow-sm transition",
        pathname===to && "bg-white shadow-sm")}>
      <span className="inline-flex items-center gap-2">{icon}{label}</span>
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-brand-600 to-brand-700 text-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-6">
        <Link to="/" className="flex items-center gap-2 font-semibold text-lg">
          <Car size={20}/> Loccar
        </Link>
        <nav className="flex items-center gap-2">
          {item("/veiculos", <Car size={16}/>, "Gestão de Veículos")}
          {item("/clientes/novo", <Users2 size={16}/>, "Cadastro de Clientes")}
          {item("/locacao", <ClipboardList size={16}/>, "Locação")}
        </nav>
      </div>
    </header>
  );
}
import { createBrowserRouter } from "react-router-dom";
import VeiculosPage from "./pages/VeiculosPage";
import CadastroClientePage from "./pages/CadastroClientePage";
import PedidoDetalhesPage from "./pages/PedidoDetalhesPage";
import LocacaoPage from "./pages/LocacaoPage";

export const router = createBrowserRouter([
  { path: "/", element: <VeiculosPage /> },
  { path: "/veiculos", element: <VeiculosPage /> },
  { path: "/clientes/novo", element: <CadastroClientePage /> },
  { path: "/pedidos/:id", element: <PedidoDetalhesPage /> },
  { path: "/locacao", element: <LocacaoPage /> },
]);
const base = "";

async function http<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(base + url, {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    ...init
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<T>;
}

export const api = {
  veiculos: {
    list: () => http<import("./types").Veiculo[]>("/api/veiculos"),             // crie endpoint GET /api/veiculos
    disponiblizar: (id: number) => http<void>(`/api/veiculos/${id}/disponibilizar`, { method: "POST" })
  },
  clientes: {
    criar: (c: import("./types").Cliente) => http<import("./types").Cliente>("/api/clientes", { method:"POST", body: JSON.stringify(c) })
  },
  pedidos: {
    criar: (clienteId: number, veiculoId: number) => http<import("./types").Pedido>("/api/pedidos", {
      method:"POST", body: JSON.stringify({ clienteId, veiculoId })
    }),
    get: (id: number) => http<import("./types").Pedido>(`/api/pedidos/${id}`)
  }
};
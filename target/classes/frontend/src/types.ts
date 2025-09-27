export type StatusVeiculo = "FROTA_DISPONIVEL" | "ALUGADO" | "MANUTENCAO";
export type StatusPedido = "CRIADO" | "EM_ANALISE" | "APROVADO" | "REPROVADO" | "CONTRATADO" | "CANCELADO";

export interface Veiculo {
  id: number; marca: string; modelo: string; ano: number; placa: string; status: StatusVeiculo;
}
export interface Cliente {
  id?: number; nome: string; cpf: string; cnh: string; cidade: string; estado: string; endereco?: string;
}
export interface Pedido {
  id: number; cliente: Cliente; veiculo: Veiculo; status: StatusPedido; criacaoEm?: string;
}
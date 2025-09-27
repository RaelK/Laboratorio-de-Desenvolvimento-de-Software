package com.loccar.web.controller;

import com.loccar.domain.enums.StatusVeiculo;
import com.loccar.domain.model.Pedido;            // <<< ADD
import com.loccar.repository.VeiculoRepository;
import com.loccar.service.PedidoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/pedidos")
@RequiredArgsConstructor
public class PedidoController {
  private final PedidoService service;
  private final VeiculoRepository veiculoRepo;

  @GetMapping("/novo")
  public String novo(@RequestParam Long clienteId, Model model){
    model.addAttribute("clienteId", clienteId);
    model.addAttribute("veiculos", veiculoRepo.findByStatus(StatusVeiculo.FROTA_DISPONIVEL));
    return "pedidos/novo";
  }

  @PostMapping
  public String criar(@RequestParam Long clienteId, @RequestParam Long veiculoId){
    Pedido p = service.criarPedido(clienteId, veiculoId);   // <<< trocado de var para Pedido
    return "redirect:/pedidos/" + p.getId();
  }

  @GetMapping("/{id}")
  public String detalhes(@PathVariable Long id, Model model){
    model.addAttribute("pedido", service.buscar(id));
    return "pedidos/detalhes";
  }
}
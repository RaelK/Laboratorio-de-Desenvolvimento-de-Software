package com.loccar.web.controller;

import com.loccar.domain.model.Cliente;
import com.loccar.repository.ClienteRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/clientes")
@RequiredArgsConstructor
public class ClienteController {
  private final ClienteRepository repo;

  @GetMapping("/novo")
  public String novo(Model model){
    model.addAttribute("cliente", new Cliente());
    return "clientes/cadastro";
  }

  @PostMapping
  public String salvar(@Valid @ModelAttribute Cliente cliente, BindingResult br){
    if(br.hasErrors()) return "clientes/cadastro";
    repo.save(cliente);
    return "redirect:/pedidos/novo?clienteId=" + cliente.getId();
  }
}

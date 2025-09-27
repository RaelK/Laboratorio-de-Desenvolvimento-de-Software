package com.loccar.web.controller;

import com.loccar.domain.enums.StatusVeiculo;
import com.loccar.domain.model.Veiculo;           // <<< ADD
import com.loccar.repository.VeiculoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;          // <<< ADD

@Controller
@RequestMapping("/veiculos")
@RequiredArgsConstructor
public class VeiculoController {
  private final VeiculoRepository repo;

  @GetMapping
  public String listar(Model model){
    model.addAttribute("veiculos", repo.findAll());
    return "veiculos/lista";
  }

  @PostMapping("/{id}/disponibilizar")
  public String disponibilizar(@PathVariable Long id){
    Veiculo v = repo.findById(id)
        .orElseThrow(() -> new NoSuchElementException("Veículo não encontrado")); // <<< Supplier
    v.setStatus(StatusVeiculo.FROTA_DISPONIVEL);
    repo.save(v);
    return "redirect:/veiculos";
  }
}
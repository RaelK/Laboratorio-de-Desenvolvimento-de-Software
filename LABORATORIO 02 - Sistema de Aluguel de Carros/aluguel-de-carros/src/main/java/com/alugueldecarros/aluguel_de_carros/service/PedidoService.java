package com.loccar.service;

import com.loccar.domain.enums.StatusPedido;
import com.loccar.domain.enums.StatusVeiculo;
import com.loccar.domain.model.Cliente;
import com.loccar.domain.model.Pedido;
import com.loccar.domain.model.Veiculo;
import com.loccar.repository.ClienteRepository;
import com.loccar.repository.PedidoRepository;
import com.loccar.repository.VeiculoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class PedidoService {

  private final PedidoRepository pedidoRepo;
  private final VeiculoRepository veiculoRepo;
  private final ClienteRepository clienteRepo;

  @Transactional
  public Pedido criarPedido(Long clienteId, Long veiculoId) {
    Cliente c = clienteRepo.findById(clienteId)
        .orElseThrow(() -> new NoSuchElementException("Cliente não encontrado"));

    Veiculo v = veiculoRepo.findById(veiculoId)
        .orElseThrow(() -> new NoSuchElementException("Veículo não encontrado"));

    if (v.getStatus() != StatusVeiculo.FROTA_DISPONIVEL) {
      throw new IllegalStateException("Veículo indisponível");
    }

    v.setStatus(StatusVeiculo.ALUGADO);
    veiculoRepo.save(v);

    Pedido p = Pedido.builder()
        .cliente(c)
        .veiculo(v)
        .status(StatusPedido.CRIADO)
        .build();

    return pedidoRepo.save(p);
  }

  public Pedido buscar(Long id) {
    return pedidoRepo.findById(id)
        .orElseThrow(() -> new NoSuchElementException("Pedido não encontrado"));
  }
}
package com.loccar.repository;
import com.loccar.domain.model.Contrato;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
public interface ContratoRepository extends JpaRepository<Contrato, Long> {
  Optional<Contrato> findByPedidoId(Long pedidoId);
}

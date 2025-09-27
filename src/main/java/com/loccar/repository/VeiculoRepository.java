package com.loccar.repository;
import com.loccar.domain.enums.StatusVeiculo;
import com.loccar.domain.model.Veiculo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface VeiculoRepository extends JpaRepository<Veiculo, Long> {
  List<Veiculo> findByStatus(StatusVeiculo status);
}

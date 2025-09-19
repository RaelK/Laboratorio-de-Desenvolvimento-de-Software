package com.alugueldecarros.aluguel_de_carros.repository;

import com.alugueldecarros.aluguel_de_carros.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    Optional<Cliente> findByCpf(String cpf);
    Optional<Cliente> findByEmail(String email);
    List<Cliente> findByNameContainingIgnoreCase(String name);
}

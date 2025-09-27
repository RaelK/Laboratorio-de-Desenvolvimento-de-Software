package com.loccar.repository;
import com.loccar.domain.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
public interface PedidoRepository extends JpaRepository<Pedido, Long> {}

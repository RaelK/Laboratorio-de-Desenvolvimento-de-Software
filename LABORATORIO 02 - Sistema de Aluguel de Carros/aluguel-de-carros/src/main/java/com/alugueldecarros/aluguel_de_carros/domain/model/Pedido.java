package com.loccar.domain.model;

import com.loccar.domain.enums.StatusPedido;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity @Table(name = "pedidos")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Pedido {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @ManyToOne(optional=false)
  private Cliente cliente;
  @ManyToOne(optional=false)
  private Veiculo veiculo;
  @CreationTimestamp
  private LocalDateTime criacaoEm;
  @Enumerated(EnumType.STRING)
  private StatusPedido status;
}

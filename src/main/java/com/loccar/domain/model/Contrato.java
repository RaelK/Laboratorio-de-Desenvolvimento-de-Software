package com.loccar.domain.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity @Table(name = "contratos")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Contrato {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @OneToOne(optional=false)
  private Pedido pedido;
  private String numero;
  private BigDecimal valorTotal;
  private LocalDate inicio;
  private LocalDate fim;
}

package com.loccar.domain.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity @Table(name = "manutencoes")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Manutencao {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @ManyToOne(optional = false)
  private Veiculo veiculo;
  private String descricao;
  private LocalDate data;
  private BigDecimal custo;
}

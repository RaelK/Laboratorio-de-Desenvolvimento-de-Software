package com.loccar.domain.model;

import com.loccar.domain.enums.StatusVeiculo;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "veiculos")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Veiculo {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String marca;
  private String modelo;
  private Integer ano;
  @Column(unique = true)
  private String placa;
  @Enumerated(EnumType.STRING)
  private StatusVeiculo status;

  @OneToMany(mappedBy = "veiculo")
  @Builder.Default
  private List<Manutencao> manutencoes = new ArrayList<>();

}

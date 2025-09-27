package com.loccar.domain.model;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name = "clientes")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Cliente {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String nome;
  private String cpf;
  private String cnh;
  private String endereco;
  private String cidade;
  private String estado;
}

package com.example.bitStudent.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "empresa_parceira")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmpresaParceira {

    @Id
    private Long id;

    private String nome;

    private String login;
    private String senha;
    private String email;

    private String cnpj;
    private String endereco;
}
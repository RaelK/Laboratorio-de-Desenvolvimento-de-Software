package com.example.bitStudent.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Aluno {

    @Id
    private Long id;
    private String nome;
    private String email;
    private String senha;
    private String cpf;
    private String rg;
    private String endereco;
    private String curso;

    private String instituicao; // AGORA EXISTE!
    private Integer saldoMoedas; // AGORA EXISTE!

}
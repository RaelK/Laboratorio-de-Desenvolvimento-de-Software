package com.example.bitStudent.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Professor {

    @Id
    private Long id;

    private String nome;
    private String cpf;
    private String departamento;

    // Campo necessário para login (não existia antes)
    private String email;

    private String senha;

    // Saldo padrão de moedas para cada semestre
    private int saldoMoedas = 1000;
}
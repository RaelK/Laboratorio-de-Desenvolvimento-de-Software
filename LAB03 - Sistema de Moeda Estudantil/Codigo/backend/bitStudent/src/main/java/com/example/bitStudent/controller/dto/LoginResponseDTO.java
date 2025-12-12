package com.example.bitStudent.controller.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class LoginResponseDTO {

    private Long id;
    private String nome;
    private String tipo;        // aluno, professor, empresa
    private Integer saldo;      // somente aluno ou professor
    private String token;       // fake token

}
package com.example.bitStudent.controller.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String role; // ALUNO | PROFESSOR | EMPRESA
    private String nome;
    private String email;
    private String senha;
}

package com.example.bitStudent.service;

import com.example.bitStudent.model.Aluno;
import com.example.bitStudent.repository.AlunoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AlunoRepository alunoRepository;

    public Aluno autenticarAluno(String email, String senha) {
        return alunoRepository.findByEmailAndSenha(email, senha)
                .orElse(null);
    }
}
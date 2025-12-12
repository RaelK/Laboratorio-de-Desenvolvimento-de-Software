package com.example.bitStudent.repository;

import com.example.bitStudent.model.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AlunoRepository extends JpaRepository<Aluno, Long> {

    Optional<Aluno> findByEmailAndSenha(String email, String senha);

}
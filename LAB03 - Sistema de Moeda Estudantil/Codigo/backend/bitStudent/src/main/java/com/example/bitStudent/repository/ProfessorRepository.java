package com.example.bitStudent.repository;

import com.example.bitStudent.model.Professor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfessorRepository extends JpaRepository<Professor, Long> {

    Optional<Professor> findByEmailAndSenha(String email, String senha);

}
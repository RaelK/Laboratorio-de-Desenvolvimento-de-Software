package com.example.bitStudent.repository;

import com.example.bitStudent.model.EmpresaParceira;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmpresaParceiraRepository extends JpaRepository<EmpresaParceira, Long> {

    Optional<EmpresaParceira> findByEmailAndSenha(String email, String senha);
}

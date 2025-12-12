package com.example.bitStudent.repository;

import com.example.bitStudent.model.Transacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransacaoRepository extends JpaRepository<Transacao, Long> {

    // Extrato de um aluno
    List<Transacao> findByAlunoId(Long alunoId);

    // Extrato de um professor (necessário para o frontend)
    List<Transacao> findByProfessorId(Long professorId);

}
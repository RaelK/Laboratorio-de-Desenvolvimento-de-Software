package com.example.bitStudent.service;

import com.example.bitStudent.model.Professor;
import com.example.bitStudent.repository.ProfessorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProfessorService {

    private final ProfessorRepository professorRepository;

    public Professor autenticar(String email, String senha) {
        return professorRepository.findByEmailAndSenha(email, senha).orElse(null);
    }

    public Professor criar(Professor p) {
        return professorRepository.save(p);
    }

    public List<Professor> listar() {
        return professorRepository.findAll();
    }

    public Professor buscar(Long id) {
        return professorRepository.findById(id).orElse(null);
    }

    public Professor atualizar(Long id, Professor dados) {
        Professor p = buscar(id);
        if (p == null)
            return null;

        p.setNome(dados.getNome());
        p.setCpf(dados.getCpf());
        p.setDepartamento(dados.getDepartamento());
        p.setEmail(dados.getEmail());
        p.setSenha(dados.getSenha());

        return professorRepository.save(p);
    }

    public void deletar(Long id) {
        professorRepository.deleteById(id);
    }

    public Professor salvar(Professor professor) {
        return professorRepository.save(professor);
    }

}
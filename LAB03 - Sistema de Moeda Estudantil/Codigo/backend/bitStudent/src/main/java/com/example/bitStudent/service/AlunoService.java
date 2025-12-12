package com.example.bitStudent.service;

import com.example.bitStudent.model.Aluno;
import com.example.bitStudent.repository.AlunoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AlunoService {

    private final AlunoRepository alunoRepository;

    public Aluno criarAluno(Aluno aluno) {
        aluno.setSaldoMoedas(0);
        return alunoRepository.save(aluno);
    }

    public Aluno atualizarAluno(Long id, Aluno dados) {
        return alunoRepository.findById(id).map(aluno -> {
            aluno.setNome(dados.getNome());
            aluno.setEmail(dados.getEmail());
            aluno.setSenha(dados.getSenha());
            aluno.setCpf(dados.getCpf());
            aluno.setRg(dados.getRg());
            aluno.setEndereco(dados.getEndereco());
            aluno.setCurso(dados.getCurso());
            aluno.setInstituicao(dados.getInstituicao());
            return alunoRepository.save(aluno);
        }).orElseThrow(() -> new RuntimeException("Aluno não encontrado"));
    }

    public List<Aluno> listarTodos() {
        return alunoRepository.findAll();
    }

    public Aluno buscarPorId(Long id) {
        return alunoRepository.findById(id).orElse(null);
    }

    public void deletar(Long id) {
        alunoRepository.deleteById(id);
    }

    public Aluno autenticar(String email, String senha) {
        return alunoRepository.findByEmailAndSenha(email, senha).orElse(null);
    }

    public Aluno salvar(Aluno aluno) {
        return alunoRepository.save(aluno);
    }
}
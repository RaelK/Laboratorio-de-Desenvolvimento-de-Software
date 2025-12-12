package com.example.bitStudent.service;

import com.example.bitStudent.model.InstituicaoEnsino;
import com.example.bitStudent.repository.InstituicaoEnsinoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InstituicaoEnsinoService {

    private final InstituicaoEnsinoRepository repository;

    public InstituicaoEnsinoService(InstituicaoEnsinoRepository repository) {
        this.repository = repository;
    }

    public List<InstituicaoEnsino> listarTodas() {
        return repository.findAll();
    }
}

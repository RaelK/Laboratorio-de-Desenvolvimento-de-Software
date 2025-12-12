package com.example.bitStudent.controller;

import com.example.bitStudent.model.InstituicaoEnsino;
import com.example.bitStudent.repository.InstituicaoEnsinoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/instituicoes")
@CrossOrigin(origins = "*") // permite o frontend acessar
public class InstituicaoEnsinoController {

    private final InstituicaoEnsinoRepository repository;

    public InstituicaoEnsinoController(InstituicaoEnsinoRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<InstituicaoEnsino> listar() {
        return repository.findAll();
    }
}
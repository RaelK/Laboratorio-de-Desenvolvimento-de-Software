package controller;

import lombok.RequiredArgsConstructor;
import model.InstituicaoEnsino;
import org.springframework.web.bind.annotation.*;
import repository.InstituicaoEnsinoRepository;

import java.util.List;

@RestController
@RequestMapping("/instituicoes")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class InstituicaoEnsinoController {

    private final InstituicaoEnsinoRepository instituicaoEnsinoRepository;

    @GetMapping
    public List<InstituicaoEnsino> listar() {
        return instituicaoEnsinoRepository.findAll();
    }
}
package com.example.bitStudent.service;

import com.example.bitStudent.model.EmpresaParceira;
import com.example.bitStudent.repository.EmpresaParceiraRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmpresaParceiraService {

    private final EmpresaParceiraRepository empresaRepository;

    public EmpresaParceira salvar(EmpresaParceira empresa) {
        return empresaRepository.save(empresa);
    }

    public EmpresaParceira criar(EmpresaParceira empresa) {
        return empresaRepository.save(empresa);
    }

    public List<EmpresaParceira> listarTodas() {
        return empresaRepository.findAll();
    }

    public EmpresaParceira buscar(Long id) {
        return empresaRepository.findById(id).orElse(null);
    }

    public EmpresaParceira autenticar(String email, String senha) {
        return empresaRepository.findByEmailAndSenha(email, senha).orElse(null);
    }
}

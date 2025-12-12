package com.example.bitStudent.controller;

import com.example.bitStudent.model.EmpresaParceira;
import com.example.bitStudent.service.EmpresaParceiraService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/empresas")
@RequiredArgsConstructor
public class EmpresaParceiraController {

    private final EmpresaParceiraService service;

    @PostMapping
    public ResponseEntity<EmpresaParceira> criar(@RequestBody EmpresaParceira empresa) {
        return ResponseEntity.ok(service.criar(empresa));
    }

    @GetMapping
    public ResponseEntity<List<EmpresaParceira>> listar() {
        return ResponseEntity.ok(service.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmpresaParceira> buscar(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscar(id));
    }
}
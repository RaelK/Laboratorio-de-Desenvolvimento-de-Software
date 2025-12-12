package com.example.bitStudent.controller;

import com.example.bitStudent.model.Professor;
import com.example.bitStudent.service.ProfessorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/professores")
@RequiredArgsConstructor
public class ProfessorController {

    private final ProfessorService professorService;

    @PostMapping
    public ResponseEntity<Professor> criar(@RequestBody Professor professor) {
        return ResponseEntity.ok(professorService.criar(professor));
    }

    @GetMapping
    public ResponseEntity<List<Professor>> listar() {
        return ResponseEntity.ok(professorService.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Professor> buscar(@PathVariable Long id) {
        Professor p = professorService.buscar(id);
        if (p == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(p);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Professor> atualizar(@PathVariable Long id, @RequestBody Professor professor) {
        Professor atualizado = professorService.atualizar(id, professor);
        if (atualizado == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(atualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        professorService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
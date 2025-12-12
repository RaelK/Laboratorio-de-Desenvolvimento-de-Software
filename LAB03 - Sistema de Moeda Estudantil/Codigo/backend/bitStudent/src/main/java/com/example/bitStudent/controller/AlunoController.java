package com.example.bitStudent.controller;

import com.example.bitStudent.model.Aluno;
import com.example.bitStudent.model.Transacao;
import com.example.bitStudent.service.AlunoService;
import com.example.bitStudent.service.TransacaoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/alunos")
@RequiredArgsConstructor
public class AlunoController {

    private final AlunoService alunoService;
    private final TransacaoService transacaoService;

    @PostMapping
    public ResponseEntity<Aluno> criarAluno(@RequestBody Aluno aluno) {
        return ResponseEntity.ok(alunoService.criarAluno(aluno));
    }

    @GetMapping
    public ResponseEntity<List<Aluno>> listarTodos() {
        return ResponseEntity.ok(alunoService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Aluno> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(alunoService.buscarPorId(id)); // corrigido
    }

    @PutMapping("/{id}")
    public ResponseEntity<Aluno> atualizar(
            @PathVariable Long id,
            @RequestBody Aluno alunoAtualizado) {

        return ResponseEntity.ok(alunoService.atualizarAluno(id, alunoAtualizado));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        alunoService.deletar(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}/extrato")
    public ResponseEntity<List<Transacao>> extrato(@PathVariable Long id) {
        return ResponseEntity.ok(transacaoService.listarTransacoesPorAluno(id));
    }
}
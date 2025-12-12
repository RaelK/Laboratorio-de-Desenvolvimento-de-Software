package com.example.bitStudent.controller;

import com.example.bitStudent.controller.dto.TransacaoCreateDTO;
import com.example.bitStudent.model.Transacao;
import com.example.bitStudent.service.TransacaoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transacoes")
@CrossOrigin(origins = "*")
public class TransacaoController {

    @Autowired
    private TransacaoService transacaoService;

    // LISTAR TODAS
    @GetMapping
    public ResponseEntity<List<Transacao>> listarTodas() {
        return ResponseEntity.ok(transacaoService.listarTodas());
    }

    // LISTAR EXTRATO DO ALUNO
    @GetMapping("/aluno/{id}")
    public ResponseEntity<List<Transacao>> listarPorAluno(@PathVariable Long id) {
        return ResponseEntity.ok(transacaoService.listarTransacoesPorAluno(id));
    }

    // LISTAR EXTRATO DO PROFESSOR
    @GetMapping("/professor/{id}")
    public ResponseEntity<List<Transacao>> listarPorProfessor(@PathVariable Long id) {
        return ResponseEntity.ok(transacaoService.listarTransacoesPorProfessor(id));
    }

    // ENVIAR MOEDAS
    @PostMapping("/enviar")
    public ResponseEntity<Transacao> enviarMoedas(@RequestBody TransacaoCreateDTO dto) {
        Transacao tx = transacaoService.enviarMoedas(dto);
        return ResponseEntity.ok(tx);
    }
}
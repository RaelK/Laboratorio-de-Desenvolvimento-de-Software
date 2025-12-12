package com.example.bitStudent.controller;

import com.example.bitStudent.model.Resgate;
import com.example.bitStudent.service.ResgateService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/resgates")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ResgateController {

    private final ResgateService service;

    // POST /resgates/resgatar?alunoId=1&vantagemId=1
    @PostMapping("/resgatar")
    public ResponseEntity<Resgate> resgatar(
            @RequestParam Long alunoId,
            @RequestParam Long vantagemId
    ) {
        Resgate resgate = service.resgatar(alunoId, vantagemId);
        return ResponseEntity.ok(resgate);
    }

    @GetMapping
    public ResponseEntity<List<Resgate>> listar() {
        return ResponseEntity.ok(service.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Resgate> buscar(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscar(id));
    }
}
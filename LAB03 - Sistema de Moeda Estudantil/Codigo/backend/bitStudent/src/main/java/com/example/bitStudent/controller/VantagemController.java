package com.example.bitStudent.controller;

import com.example.bitStudent.model.EmpresaParceira;
import com.example.bitStudent.model.Vantagem;
import com.example.bitStudent.service.EmpresaParceiraService;
import com.example.bitStudent.service.VantagemService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/vantagens")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // FRONTEND LIBERADO
public class VantagemController {

    private final VantagemService vantagemService;
    private final EmpresaParceiraService empresaService;

    // ---------------------------------------------------------------
    // 1) USADO PELO FRONTEND — RECEBE JSON SIMPLES
    // ---------------------------------------------------------------
    @PostMapping
    public ResponseEntity<Vantagem> criarViaJson(@RequestBody Vantagem vantagem) {

        // Evita erro de PK duplicada (ID vindo do front)
        vantagem.setId(null);

        if (vantagem.getEmpresaParceira() == null ||
                vantagem.getEmpresaParceira().getId() == null) {
            throw new RuntimeException("Empresa parceira não informada.");
        }

        EmpresaParceira empresa =
                empresaService.buscar(vantagem.getEmpresaParceira().getId());

        return ResponseEntity.ok(
                vantagemService.criarViaJson(vantagem, empresa)
        );
    }

    // ---------------------------------------------------------------
    // 2) OPCIONAL — MULTIPART PARA UPLOAD REAL DE IMAGEM
    // ---------------------------------------------------------------
    @PostMapping("/empresa/{empresaId}")
    public ResponseEntity<Vantagem> criarComMultipart(
            @PathVariable Long empresaId,
            @RequestPart("dados") Vantagem vantagem,
            @RequestPart(value = "foto", required = false) MultipartFile foto) {

        vantagem.setId(null); // evita sobrescrever ID

        EmpresaParceira empresa = empresaService.buscar(empresaId);

        return ResponseEntity.ok(
                vantagemService.criar(vantagem, empresa, foto)
        );
    }

    // ---------------------------------------------------------------
    // LISTAR / BUSCAR / EDITAR / DELETAR
    // ---------------------------------------------------------------
    @GetMapping
    public ResponseEntity<List<Vantagem>> listar() {
        return ResponseEntity.ok(vantagemService.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vantagem> buscar(@PathVariable Long id) {
        return ResponseEntity.ok(vantagemService.buscar(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Vantagem> atualizar(
            @PathVariable Long id,
            @RequestBody Vantagem v) {

        // impedir que o front envie ID e quebre o banco
        v.setId(null);

        return ResponseEntity.ok(vantagemService.atualizar(id, v));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        vantagemService.deletar(id);
        return ResponseEntity.ok().build();
    }
}
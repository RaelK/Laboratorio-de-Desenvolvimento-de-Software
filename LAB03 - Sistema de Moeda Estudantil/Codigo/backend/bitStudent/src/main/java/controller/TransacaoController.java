package controller;

import controller.dto.TransacaoCreateDTO;
import lombok.RequiredArgsConstructor;
import model.Transacao;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import service.TransacaoService;

import java.util.List;

@RestController
@RequestMapping("/transacoes")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TransacaoController {

    private final TransacaoService transacaoService;

    /** 🔹 Enviar moedas */
    @PostMapping("/enviar")
    public ResponseEntity<?> enviarMoedas(@RequestBody TransacaoCreateDTO dto) {
        try {
            Transacao t = transacaoService.transferirDeProfessorParaAluno(
                    dto.getIdProfessor(),
                    dto.getIdAluno(),
                    dto.getValor(),
                    dto.getDescricao()
            );
            return ResponseEntity.ok(t);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    /** 🔹 Extrato por professor */
    @GetMapping("/professor/{id}")
    public ResponseEntity<List<Transacao>> listarPorProfessor(@PathVariable Long id) {
        return ResponseEntity.ok(transacaoService.extratoProfessor(id));
    }

    /** 🔹 Extrato por aluno */
    @GetMapping("/aluno/{id}")
    public ResponseEntity<List<Transacao>> listarPorAluno(@PathVariable Long id) {
        return ResponseEntity.ok(transacaoService.extratoAluno(id));
    }
}
package controller;

import controller.dto.TransacaoCreateDTO;
import model.Transacao;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import service.TransacaoService;

import java.net.URI;

@RestController
@RequestMapping("/transacoes")
public class TransacaoController {

    private final TransacaoService transacaoService;

    public TransacaoController(TransacaoService transacaoService) {
        this.transacaoService = transacaoService;
    }

    @PostMapping
    public ResponseEntity<Transacao> transferir(@RequestBody TransacaoCreateDTO dto) {
        Transacao t = transacaoService.transferirDeProfessorParaAluno(dto.getProfessorId(), dto.getAlunoId(), dto.getValor(), dto.getDescricao());
        return ResponseEntity.created(URI.create("/transacoes/" + t.getId())).body(t);
    }

}

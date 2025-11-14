package controller;

import controller.dto.AlunoCreateDTO;
import controller.dto.AlunoDTO;
import model.Aluno;
import model.Transacao;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import service.AlunoService;
import service.TransacaoService;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/alunos")
@CrossOrigin(origins = "*")
public class AlunoController {

    private final AlunoService alunoService;
    private final TransacaoService transacaoService;

    public AlunoController(AlunoService alunoService, TransacaoService transacaoService) {
        this.alunoService = alunoService;
        this.transacaoService = transacaoService;
    }

    @GetMapping
    public List<AlunoDTO> all() {
        return alunoService.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public AlunoDTO get(@PathVariable Long id) {
        return toDTO(alunoService.findById(id));
    }

    @PostMapping
    public ResponseEntity<AlunoDTO> create(@RequestBody AlunoCreateDTO dto) {
        Aluno aluno = fromCreateDTO(dto);
        Aluno created = alunoService.create(aluno);
        return ResponseEntity.created(URI.create("/alunos/" + created.getId())).body(toDTO(created));
    }

    @PutMapping("/{id}")
    public AlunoDTO update(@PathVariable Long id, @RequestBody AlunoCreateDTO dto) {
        Aluno updated = fromCreateDTO(dto);
        return toDTO(alunoService.update(id, updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        alunoService.delete(id);
        return ResponseEntity.noContent().build();
    }

    /** 🔹 Extrato de moedas do aluno */
    @GetMapping("/{id}/extrato")
    public ResponseEntity<List<Transacao>> extrato(@PathVariable Long id) {
        return ResponseEntity.ok(transacaoService.extratoAluno(id));
    }

    // -------------------- DTO mappers --------------------
    private AlunoDTO toDTO(Aluno a) {
        return AlunoDTO.builder()
                .id(a.getId())
                .nome(a.getNome())
                .email(a.getEmail())
                .cpf(a.getCpf())
                .login(a.getLogin())
                .rg(a.getRg())
                .endereco(a.getEndereco())
                .curso(a.getCurso())
                .saldoMoedas(a.getSaldoMoedas())
                .instituicaoEnsino(a.getInstituicaoEnsino())
                .build();
    }

    private Aluno fromCreateDTO(AlunoCreateDTO dto) {
        return Aluno.builder()
                .nome(dto.getNome())
                .email(dto.getEmail())
                .cpf(dto.getCpf())
                .login(dto.getLogin())
                .senha(dto.getSenha())
                .rg(dto.getRg())
                .endereco(dto.getEndereco())
                .curso(dto.getCurso())
                .saldoMoedas(dto.getSaldoMoedas())
                .instituicaoEnsino(dto.getInstituicaoEnsino())
                .build();
    }
}
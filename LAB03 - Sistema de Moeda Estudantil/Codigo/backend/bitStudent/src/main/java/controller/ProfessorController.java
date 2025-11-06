package controller;

import controller.dto.ProfessorCreateDTO;
import controller.dto.ProfessorDTO;
import model.Professor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import service.ProfessorService;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/professores")
public class ProfessorController {

    private final ProfessorService professorService;

    public ProfessorController(ProfessorService professorService) {
        this.professorService = professorService;
    }

    @GetMapping
    public List<ProfessorDTO> all() {
        return professorService.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ProfessorDTO get(@PathVariable Long id) {
        return toDTO(professorService.findById(id));
    }

    @PostMapping
    public ResponseEntity<ProfessorDTO> create(@RequestBody ProfessorCreateDTO dto) {
        Professor p = fromCreateDTO(dto);
        Professor created = professorService.create(p);
        return ResponseEntity.created(URI.create("/professores/" + created.getId())).body(toDTO(created));
    }

    @PutMapping("/{id}")
    public ProfessorDTO update(@PathVariable Long id, @RequestBody ProfessorCreateDTO dto) {
        Professor updated = fromCreateDTO(dto);
        return toDTO(professorService.update(id, updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        professorService.delete(id);
        return ResponseEntity.noContent().build();
    }

    private ProfessorDTO toDTO(Professor p) {
        return ProfessorDTO.builder()
                .id(p.getId())
                .nome(p.getNome())
                .email(p.getEmail())
                .cpf(p.getCpf())
                .login(p.getLogin())
                .departamento(p.getDepartamento())
                .saldoMoedas(p.getSaldoMoedas())
                .build();
    }

    private Professor fromCreateDTO(ProfessorCreateDTO dto) {
        return Professor.builder()
                .nome(dto.getNome())
                .email(dto.getEmail())
                .cpf(dto.getCpf())
                .login(dto.getLogin())
                .senha(dto.getSenha())
                .departamento(dto.getDepartamento())
                .saldoMoedas(dto.getSaldoMoedas())
                .build();
    }
}

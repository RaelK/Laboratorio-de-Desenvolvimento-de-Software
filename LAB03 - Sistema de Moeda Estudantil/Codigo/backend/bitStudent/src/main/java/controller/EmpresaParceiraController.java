package controller;

import controller.dto.EmpresaParceiraCreateDTO;
import controller.dto.EmpresaParceiraDTO;
import model.EmpresaParceira;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import service.EmpresaParceiraService;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/empresas")
public class EmpresaParceiraController {

    private final EmpresaParceiraService empresaService;

    public EmpresaParceiraController(EmpresaParceiraService empresaService) {
        this.empresaService = empresaService;
    }

    @GetMapping
    public List<EmpresaParceiraDTO> all() {
        return empresaService.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public EmpresaParceiraDTO get(@PathVariable Long id) {
        return toDTO(empresaService.findById(id));
    }

    @PostMapping
    public ResponseEntity<EmpresaParceiraDTO> create(@RequestBody EmpresaParceiraCreateDTO dto) {
        EmpresaParceira empresa = EmpresaParceira.builder()
                .nome(dto.getNome())
                .email(dto.getEmail())
                .login(dto.getLogin())
                .senha(dto.getSenha())
                .build();
        EmpresaParceira created = empresaService.create(empresa);
        return ResponseEntity.created(URI.create("/empresas/" + created.getId())).body(toDTO(created));
    }

    @PutMapping("/{id}")
    public EmpresaParceiraDTO update(@PathVariable Long id, @RequestBody EmpresaParceiraCreateDTO dto) {
        EmpresaParceira empresa = EmpresaParceira.builder()
                .nome(dto.getNome())
                .email(dto.getEmail())
                .login(dto.getLogin())
                .senha(dto.getSenha())
                .build();
        return toDTO(empresaService.update(id, empresa));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        empresaService.delete(id);
        return ResponseEntity.noContent().build();
    }

    private EmpresaParceiraDTO toDTO(EmpresaParceira e) {
        return EmpresaParceiraDTO.builder()
                .id(e.getId())
                .nome(e.getNome())
                .email(e.getEmail())
                .login(e.getLogin())
                .build();
    }
}

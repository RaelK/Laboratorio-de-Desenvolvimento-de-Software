package controller;

import controller.dto.ResgateCreateDTO;
import model.Resgate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import service.ResgateService;

import java.net.URI;

@RestController
@RequestMapping("/resgates")
public class ResgateController {

    private final ResgateService resgateService;

    public ResgateController(ResgateService resgateService) {
        this.resgateService = resgateService;
    }

    @PostMapping
    public ResponseEntity<Resgate> resgatar(@RequestBody ResgateCreateDTO dto) {
        Resgate r = resgateService.resgatar(dto.getAlunoId(), dto.getVantagemId());
        return ResponseEntity.created(URI.create("/resgates/" + r.getId())).body(r);
    }

}

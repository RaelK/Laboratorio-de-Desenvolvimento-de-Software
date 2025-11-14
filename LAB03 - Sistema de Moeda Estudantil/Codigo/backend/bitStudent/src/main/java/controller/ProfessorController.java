package controller;

import lombok.RequiredArgsConstructor;
import model.Professor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import repository.ProfessorRepository;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/professores")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ProfessorController {

    private final ProfessorRepository professorRepository;

    /** 🔹 Lista todos os professores */
    @GetMapping
    public List<Professor> listar() {
        return professorRepository.findAll();
    }

    /** 🔹 Busca um professor por ID */
    @GetMapping("/{id}")
    public Professor buscar(@PathVariable Long id) {
        return professorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Professor não encontrado"));
    }

    /** 🔹 Credita moedas semestrais (1000 × número de alunos) */
    @PostMapping("/{id}/creditar")
    public ResponseEntity<Professor> creditarMoedasSemestre(@PathVariable Long id) {
        Professor prof = professorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Professor não encontrado"));

        int bonus = (prof.getAlunos() != null ? prof.getAlunos().size() : 0)
                * Professor.MOEDAS_POR_ALUNO_POR_SEMESTRE;

        // adiciona ao saldo atual (acumulável)
        prof.setSaldoMoedas(prof.getSaldoMoedas() + bonus);
        prof.setDataUltimoCredito(LocalDate.now());

        professorRepository.save(prof);
        return ResponseEntity.ok(prof);
    }

    /** 🔹 Credita moedas semestrais a todos os professores */
    @PostMapping("/creditar-todos")
    public ResponseEntity<List<Professor>> creditarTodos() {
        List<Professor> lista = professorRepository.findAll();
        for (Professor prof : lista) {
            int bonus = (prof.getAlunos() != null ? prof.getAlunos().size() : 0)
                    * Professor.MOEDAS_POR_ALUNO_POR_SEMESTRE;
            prof.setSaldoMoedas(prof.getSaldoMoedas() + bonus);
            prof.setDataUltimoCredito(LocalDate.now());
            professorRepository.save(prof);
        }
        return ResponseEntity.ok(lista);
    }
}
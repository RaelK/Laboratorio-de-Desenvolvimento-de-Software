package com.example.bitStudent.controller;

import com.example.bitStudent.controller.dto.RegisterRequest;
import com.example.bitStudent.model.Aluno;
import com.example.bitStudent.model.EmpresaParceira;
import com.example.bitStudent.model.Professor;
import com.example.bitStudent.service.AlunoService;
import com.example.bitStudent.service.EmpresaParceiraService;
import com.example.bitStudent.service.ProfessorService;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    private final AlunoService alunoService;
    private final ProfessorService professorService;
    private final EmpresaParceiraService empresaService;

    // -------------------------------------
    // LOGIN
    // -------------------------------------
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest req) {

        // LOGIN ALUNO
        Aluno aluno = alunoService.autenticar(req.getEmail(), req.getSenha());
        if (aluno != null) {
            return ResponseEntity.ok(
                    new LoginResponse("ALUNO", aluno.getId(), aluno.getNome(), aluno.getSaldoMoedas()));
        }

        // LOGIN PROFESSOR
        Professor professor = professorService.autenticar(req.getEmail(), req.getSenha());
        if (professor != null) {
            return ResponseEntity.ok(
                    new LoginResponse("PROFESSOR", professor.getId(), professor.getNome(), professor.getSaldoMoedas()));
        }

        // LOGIN EMPRESA
        EmpresaParceira empresa = empresaService.autenticar(req.getEmail(), req.getSenha());
        if (empresa != null) {
            return ResponseEntity.ok(
                    new LoginResponse("EMPRESA", empresa.getId(), empresa.getNome(), 0));
        }

        return ResponseEntity.status(401).build();
    }

    // -------------------------------------
    // REGISTRO
    // -------------------------------------
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {

        switch (req.getRole()) {

            case "ALUNO":
                Aluno aluno = new Aluno();
                aluno.setNome(req.getNome());
                aluno.setEmail(req.getEmail());
                aluno.setSenha(req.getSenha());
                aluno.setSaldoMoedas(0);

                aluno.setCurso("A definir");
                aluno.setInstituicao("A definir");
                aluno.setCpf("000");
                aluno.setRg("000");
                aluno.setEndereco("Não informado");

                return ResponseEntity.ok(alunoService.salvar(aluno));

            case "PROFESSOR":
                Professor prof = new Professor();
                prof.setNome(req.getNome());
                prof.setEmail(req.getEmail());
                prof.setSenha(req.getSenha());
                prof.setSaldoMoedas(1000);
                prof.setCpf("000");
                prof.setDepartamento("A definir");

                return ResponseEntity.ok(professorService.salvar(prof));

            case "EMPRESA":
                EmpresaParceira emp = new EmpresaParceira();
                emp.setNome(req.getNome());
                emp.setEmail(req.getEmail());
                emp.setSenha(req.getSenha());
                emp.setCnpj("000");
                emp.setEndereco("Não informado");

                return ResponseEntity.ok(empresaService.salvar(emp));
        }

        return ResponseEntity.badRequest().body("Tipo de usuário inválido.");
    }

    // -------------------------------------
    // DTOs internos para LOGIN
    // -------------------------------------
    @Data
    public static class LoginRequest {
        private String email;
        private String senha;
    }

    @Data
    @AllArgsConstructor
    public static class LoginResponse {
        private String tipoUsuario;
        private Long idUser;
        private String nome;
        private int saldo;
    }
}
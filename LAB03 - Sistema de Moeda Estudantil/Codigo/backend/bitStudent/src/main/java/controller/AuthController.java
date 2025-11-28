package controller;

import controller.dto.LoginRequest;
import controller.dto.LoginResponse;
import model.Aluno;
import model.EmpresaParceira;
import model.Professor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import repository.AlunoRepository;
import repository.EmpresaParceiraRepository;
import repository.ProfessorRepository;
import security.JwtUtil;

/**
 * Controller responsável pela autenticação de usuários.
 * 
 * Endpoints:
 * - POST /auth/login: Autentica um usuário e retorna um token JWT
 * 
 * Processo de autenticação:
 * 1. Cliente envia login, senha e tipo de usuário
 * 2. Sistema busca o usuário no repository apropriado
 * 3. Valida a senha usando BCrypt
 * 4. Se válido, gera um token JWT
 * 5. Retorna o token e dados básicos do usuário
 */
@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private ProfessorRepository professorRepository;

    @Autowired
    private EmpresaParceiraRepository empresaParceiraRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    /**
     * Endpoint de login.
     * 
     * @param request Objeto contendo login, password e userType
     * @return LoginResponse com token JWT e dados do usuário, ou erro 401/404
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        
        // Valida se os campos obrigatórios foram enviados
        if (request.getLogin() == null || request.getPassword() == null || request.getUserType() == null) {
            return ResponseEntity.badRequest().body("Login, password and userType are required");
        }

        // Normaliza o tipo de usuário para uppercase
        String userType = request.getUserType().toUpperCase();

        try {
            // Switch baseado no tipo de usuário
            switch (userType) {
                
                case "STUDENT":
                    return authenticateStudent(request);
                
                case "PROFESSOR":
                    return authenticateProfessor(request);
                
                case "COMPANY":
                    return authenticateCompany(request);
                
                default:
                    return ResponseEntity.badRequest()
                            .body("Invalid userType. Must be STUDENT, PROFESSOR or COMPANY");
            }
            
        } catch (Exception e) {
            // Erro genérico (não expõe detalhes de segurança)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Authentication error");
        }
    }

    /**
     * Autentica um aluno.
     * 
     * @param request Dados de login
     * @return ResponseEntity com LoginResponse ou erro
     */
    private ResponseEntity<?> authenticateStudent(LoginRequest request) {
        try {
            // 1. Busca o aluno pelo login
            Aluno aluno = alunoRepository.findByLogin(request.getLogin())
                    .orElse(null);

            // 2. Se não encontrado, retorna 404
            if (aluno == null) {
                System.out.println("DEBUG: Aluno não encontrado: " + request.getLogin());
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Student not found");
            }

            System.out.println("DEBUG: Aluno encontrado: " + aluno.getNome());
            System.out.println("DEBUG: Senha do banco: " + aluno.getSenha());
            System.out.println("DEBUG: Senha enviada: " + request.getPassword());

            // 3. Valida a senha usando BCrypt
            // passwordEncoder.matches() compara a senha em texto plano com o hash
            boolean matches = passwordEncoder.matches(request.getPassword(), aluno.getSenha());
            System.out.println("DEBUG: Senhas batem? " + matches);
            
            if (!matches) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("Invalid password");
            }

            // 4. Gera o token JWT
            System.out.println("DEBUG: Gerando token JWT...");
            String token = jwtUtil.generateToken(aluno.getLogin(), "STUDENT", aluno.getId());
            System.out.println("DEBUG: Token gerado com sucesso: " + token.substring(0, 20) + "...");

            // 5. Monta a resposta
            LoginResponse response = LoginResponse.builder()
                    .token(token)
                    .userType("STUDENT")
                    .userId(aluno.getId())
                    .name(aluno.getNome())
                    .email(aluno.getEmail())
                    .build();

            System.out.println("DEBUG: Resposta montada, retornando...");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.err.println("DEBUG: Erro durante autenticação: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Authentication error: " + e.getMessage());
        }
    }

    /**
     * Autentica um professor.
     * 
     * @param request Dados de login
     * @return ResponseEntity com LoginResponse ou erro
     */
    private ResponseEntity<?> authenticateProfessor(LoginRequest request) {
        // 1. Busca o professor pelo login
        Professor professor = professorRepository.findByLogin(request.getLogin())
                .orElse(null);

        // 2. Se não encontrado, retorna 404
        if (professor == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Professor not found");
        }

        // 3. Valida a senha
        if (!passwordEncoder.matches(request.getPassword(), professor.getSenha())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid password");
        }

        // 4. Gera o token JWT
        String token = jwtUtil.generateToken(professor.getLogin(), "PROFESSOR", professor.getId());

        // 5. Monta a resposta
        LoginResponse response = LoginResponse.builder()
                .token(token)
                .userType("PROFESSOR")
                .userId(professor.getId())
                .name(professor.getNome())
                .email(professor.getEmail())
                .build();

        return ResponseEntity.ok(response);
    }

    /**
     * Autentica uma empresa parceira.
     * 
     * @param request Dados de login
     * @return ResponseEntity com LoginResponse ou erro
     */
    private ResponseEntity<?> authenticateCompany(LoginRequest request) {
        // 1. Busca a empresa pelo login
        EmpresaParceira empresa = empresaParceiraRepository.findByLogin(request.getLogin())
                .orElse(null);

        // 2. Se não encontrado, retorna 404
        if (empresa == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Company not found");
        }

        // 3. Valida a senha
        if (!passwordEncoder.matches(request.getPassword(), empresa.getSenha())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid password");
        }

        // 4. Gera o token JWT
        String token = jwtUtil.generateToken(empresa.getLogin(), "COMPANY", empresa.getId());

        // 5. Monta a resposta
        LoginResponse response = LoginResponse.builder()
                .token(token)
                .userType("COMPANY")
                .userId(empresa.getId())
                .name(empresa.getNome())
                .email(empresa.getEmail())
                .build();

        return ResponseEntity.ok(response);
    }
}

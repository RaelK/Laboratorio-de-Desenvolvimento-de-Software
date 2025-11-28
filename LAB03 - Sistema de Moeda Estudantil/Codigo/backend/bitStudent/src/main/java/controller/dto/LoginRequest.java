package controller.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO (Data Transfer Object) para requisição de login.
 * 
 * Representa os dados que o cliente envia ao fazer login:
 * - login: Username do usuário
 * - password: Senha em texto plano (será validada com BCrypt)
 * - userType: Tipo de usuário (STUDENT, PROFESSOR, COMPANY)
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {
    
    private String login;
    
    private String password;
    
    private String userType; // "STUDENT", "PROFESSOR", "COMPANY"
}

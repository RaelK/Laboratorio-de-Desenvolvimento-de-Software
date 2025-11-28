package controller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO (Data Transfer Object) para resposta de login bem-sucedido.
 * 
 * Representa os dados que o servidor retorna após autenticação:
 * - token: Token JWT para ser usado nas próximas requisições
 * - userType: Tipo de usuário autenticado
 * - userId: ID do usuário no banco de dados
 * - name: Nome do usuário
 * - email: Email do usuário
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginResponse {
    
    private String token; // Token JWT
    
    private String userType; // "STUDENT", "PROFESSOR", "COMPANY"
    
    private Long userId;
    
    private String name;
    
    private String email;
}

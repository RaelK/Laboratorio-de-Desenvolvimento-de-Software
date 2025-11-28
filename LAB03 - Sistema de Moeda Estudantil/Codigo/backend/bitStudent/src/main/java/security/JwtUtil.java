package security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

/**
 * Utilitário para criação e validação de tokens JWT.
 * 
 * JWT (JSON Web Token) é usado para autenticação stateless:
 * - O servidor gera um token após login bem-sucedido
 * - O cliente envia esse token em cada requisição
 * - O servidor valida o token sem precisar consultar o banco de dados
 */
@Component
public class JwtUtil {

    // Chave secreta para assinar o token (vem do application.properties)
    @Value("${jwt.secret}")
    private String secret;

    // Tempo de expiração do token em milissegundos (vem do application.properties)
    @Value("${jwt.expiration}")
    private Long expiration;

    /**
     * Converte a string secret em uma SecretKey compatível com HS512.
     */
    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    /**
     * Gera um token JWT contendo informações do usuário.
     * 
     * @param username Login do usuário
     * @param userType Tipo do usuário (ALUNO, PROFESSOR, EMPRESA)
     * @param userId ID do usuário no banco de dados
     * @return String com o token JWT
     */
    public String generateToken(String username, String userType, Long userId) {
        return Jwts.builder()
                .setSubject(username) // Identifica o usuário (campo principal do token)
                .claim("userType", userType) // Adiciona tipo de usuário como claim customizado
                .claim("userId", userId) // Adiciona ID do usuário como claim customizado
                .setIssuedAt(new Date()) // Data de criação do token
                .setExpiration(new Date(System.currentTimeMillis() + expiration)) // Data de expiração
                .signWith(getSigningKey(), SignatureAlgorithm.HS512) // Assina o token com algoritmo HMAC SHA-512
                .compact(); // Gera a string final do token
    }

    /**
     * Extrai o username (login) do token.
     * 
     * @param token Token JWT
     * @return Username contido no token
     */
    public String getUsernameFromToken(String token) {
        return getClaims(token).getSubject();
    }

    /**
     * Extrai o tipo de usuário do token.
     * 
     * @param token Token JWT
     * @return Tipo do usuário (ALUNO, PROFESSOR, EMPRESA)
     */
    public String getUserTypeFromToken(String token) {
        return getClaims(token).get("userType", String.class);
    }

    /**
     * Extrai o ID do usuário do token.
     * 
     * @param token Token JWT
     * @return ID do usuário
     */
    public Long getUserIdFromToken(String token) {
        return getClaims(token).get("userId", Long.class);
    }

    /**
     * Valida se o token é válido (não expirou e tem assinatura correta).
     * 
     * @param token Token JWT
     * @return true se válido, false caso contrário
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(getSigningKey()) // Usa a chave secreta para validar a assinatura
                    .build()
                    .parseClaimsJws(token); // Tenta fazer o parse do token
            return true;
        } catch (Exception e) {
            // Token inválido, expirado ou adulterado
            return false;
        }
    }

    /**
     * Extrai todos os claims (dados) do token.
     * 
     * @param token Token JWT
     * @return Claims contendo todos os dados do token
     */
    private Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}

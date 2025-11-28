package security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Configuração de segurança da aplicação.
 * 
 * Define:
 * - Quais endpoints são públicos (não precisam de autenticação)
 * - Quais endpoints são protegidos (precisam de token JWT válido)
 * - Como as senhas são criptografadas
 * - Política de sessão (stateless = sem sessão no servidor)
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    /**
     * Configura a cadeia de filtros de segurança.
     * 
     * @param http Objeto para configurar segurança HTTP
     * @return SecurityFilterChain configurado
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // Desabilita CSRF (Cross-Site Request Forgery)
            // É comum desabilitar em APIs REST que usam tokens JWT
            .csrf(csrf -> csrf.disable())
            
            // Configura autorização de requisições
            .authorizeHttpRequests(auth -> auth
                // Endpoints públicos (qualquer um pode acessar sem autenticação)
                .requestMatchers("/auth/**").permitAll() // Login e registro
                .requestMatchers("/h2-console/**").permitAll() // Console do banco H2
                
                // Todos os outros endpoints requerem autenticação
                .anyRequest().authenticated()
            )
            
            // Desabilita HTTP Basic Authentication
            .httpBasic(basic -> basic.disable())
            
            // Desabilita form login
            .formLogin(form -> form.disable())
            
            // Configura política de sessão como STATELESS
            // Isso significa que o servidor NÃO guarda sessão
            // Cada requisição deve conter o token JWT
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            
            // Desabilita proteção de frame (necessário para H2 console funcionar)
            .headers(headers -> headers.frameOptions(frame -> frame.disable()));
        
        return http.build();
    }

    /**
     * Bean para criptografar senhas usando BCrypt.
     * 
     * BCrypt é um algoritmo de hash de senha seguro que:
     * - Adiciona "salt" automático (proteção contra rainbow tables)
     * - É lento propositalmente (proteção contra força bruta)
     * - Gera hashes diferentes para a mesma senha
     * 
     * @return PasswordEncoder configurado com BCrypt
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

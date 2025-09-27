package com.loccar.service;

import com.loccar.domain.model.Usuario;           // <-- importe o seu entity
import com.loccar.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UsuarioDetailsService implements UserDetailsService {
    private final UsuarioRepository repo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario u = repo.findByUsername(username)   // <-- tire o 'var' aqui
            .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));
        return User.builder()
                .username(u.getUsername())
                .password(u.getPassword()) // BCrypt vindo do banco
                .authorities(new SimpleGrantedAuthority(u.getRole()))
                .disabled(!u.isEnabled())
                .build();
    }
}
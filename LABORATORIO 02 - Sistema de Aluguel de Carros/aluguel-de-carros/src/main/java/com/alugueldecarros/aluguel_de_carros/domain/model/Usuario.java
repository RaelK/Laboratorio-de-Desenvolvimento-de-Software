package com.loccar.domain.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "usuarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String username;

    @Column(nullable = false, length = 200)
    private String password; // senha armazenada em BCrypt

    @Column(nullable = false, length = 50)
    private String role; // ex: ROLE_CLIENTE, ROLE_AGENTE

    @Builder.Default
    @Column(nullable = false)
    private boolean enabled = true;
}
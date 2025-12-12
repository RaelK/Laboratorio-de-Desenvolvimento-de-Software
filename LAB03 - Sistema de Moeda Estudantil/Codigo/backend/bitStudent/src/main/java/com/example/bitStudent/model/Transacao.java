package com.example.bitStudent.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

// IMPORT CORRETO DO ENUM
import com.example.bitStudent.model.enums.TipoTransacao;

@Entity
@Table(name = "transacao")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Transacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String descricao;

    private Integer valor;

    @Enumerated(EnumType.STRING)
    private TipoTransacao tipo;

    @ManyToOne
    @JoinColumn(name = "professor_id", nullable = true)
    private Professor professor;

    @ManyToOne
    @JoinColumn(name = "aluno_id", nullable = true)
    private Aluno aluno;

    private LocalDateTime data;
}
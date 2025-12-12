package com.example.bitStudent.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "resgate")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Resgate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "aluno_id")
    private Aluno aluno;

    @ManyToOne
    @JoinColumn(name = "vantagem_id")
    private Vantagem vantagem;

    @Enumerated(EnumType.STRING)
    private StatusResgate status;

    private String codigoCupom;

    @Column(columnDefinition = "TEXT")
    private String qrCode;  // <<<<<< NOVO CAMPO

    private String data;
}
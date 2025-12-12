package com.example.bitStudent.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "vantagem")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Vantagem {

    @Id
    private Long id;

    // -------------------------------------------------------
    // Informações básicas
    // -------------------------------------------------------

    private String nome;

    private String categoria; // opcional: pode ser usado no futuro no front

    @Column(columnDefinition = "TEXT")
    private String descricao;

    @Column(name = "custo_moedas", nullable = false)
    private Integer custoEmMoedas;

    // -------------------------------------------------------
    // Regras de uso
    // -------------------------------------------------------

    @Column(name = "limite_por_aluno")
    private Integer limitePorAluno; // null = sem limite

    @Column(name = "limite_mensal")
    private Integer limiteMensal; // null = sem limite

    // Campo boolean gera getter isExigeAprovacaoProfessor()
    @Column(name = "exige_aprovacao_professor")
    private Boolean exigeAprovacaoProfessor;

    // código de voucher gerado automaticamente no resgate
    private String codigoVoucher;

    // Imagem ( URL ou Base64 )
    @Column(columnDefinition = "TEXT")
    private String foto;

    // -------------------------------------------------------
    // Relação com a Empresa Parceira
    // -------------------------------------------------------
    @ManyToOne
    @JoinColumn(name = "empresa_id")
    private EmpresaParceira empresaParceira;
}
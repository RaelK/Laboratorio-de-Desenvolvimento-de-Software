package model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "professor")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Professor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String email;
    private String cpf;
    private String login;
    private String senha;
    private String departamento;

    /** 🔹 Saldo total de moedas disponíveis (acumulável a cada semestre) */
    @Builder.Default
    private Integer saldoMoedas = 0;

    /** 🔹 Lista de alunos vinculados ao professor */
    @OneToMany(mappedBy = "professor")
    private List<Aluno> alunos;

    /** 🔹 Constante: 1000 moedas por aluno por semestre */
    public static final int MOEDAS_POR_ALUNO_POR_SEMESTRE = 1000;

    /** 🔹 Vínculo institucional */
    @ManyToOne
    @JoinColumn(name = "instituicao_id")
    private InstituicaoEnsino instituicaoEnsino;

    /** 🔹 Data do último crédito semestral */
    private LocalDate dataUltimoCredito;
}
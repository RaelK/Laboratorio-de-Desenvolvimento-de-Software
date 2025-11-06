package model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "resgate")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Resgate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date data;
    private String codigoCupom;

    @ManyToOne
    @JoinColumn(name = "aluno_id")
    private Aluno aluno;

    @ManyToOne
    @JoinColumn(name = "vantagem_id")
    private Vantagem vantagem;

    @ManyToOne
    @JoinColumn(name = "empresa_parceira_id")
    private EmpresaParceira empresaParceira;

}

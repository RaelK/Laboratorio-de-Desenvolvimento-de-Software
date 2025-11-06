package model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "vantagem")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Vantagem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String descricao;
    private int custoEmMoedas;
    private String foto;

    @ManyToOne
    @JoinColumn(name = "empresa_parceira_id")
    private EmpresaParceira empresaParceira;

}

package controller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProfessorDTO {
    private Long id;
    private String nome;
    private String email;
    private String cpf;
    private String login;
    private String departamento;
    private int saldoMoedas;
}

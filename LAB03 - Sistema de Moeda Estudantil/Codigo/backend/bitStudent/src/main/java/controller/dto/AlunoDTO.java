package controller.dto;

import model.InstituicaoEnsino;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AlunoDTO {
    private Long id;
    private String nome;
    private String email;
    private String cpf;
    private String login;
    private String rg;
    private String endereco;
    private String curso;
    private int saldoMoedas;
    private InstituicaoEnsino instituicaoEnsino;
}

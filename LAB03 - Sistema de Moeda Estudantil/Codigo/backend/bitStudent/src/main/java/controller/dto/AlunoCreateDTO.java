package controller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import model.InstituicaoEnsino;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AlunoCreateDTO {
    private String nome;
    private String email;
    private String cpf;
    private String login;
    private String senha;
    private String rg;
    private String endereco;
    private String curso;
    private int saldoMoedas;
    private InstituicaoEnsino instituicaoEnsino;
}

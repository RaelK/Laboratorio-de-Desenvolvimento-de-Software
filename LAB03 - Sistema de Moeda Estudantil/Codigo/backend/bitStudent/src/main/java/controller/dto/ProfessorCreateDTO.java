package controller.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProfessorCreateDTO {
    @JsonAlias({"name", "fullName"})
    private String nome;

    private String email;

    // Some clients may send 'id' as CPF; accept it as alias
    @JsonAlias({"id"})
    private String cpf;

    // alias for 'nickname'
    @JsonAlias({"nickname"})
    private String login;

    private String senha;

    // alias for 'subject'
    @JsonAlias({"subject"})
    private String departamento;

    // accept numeric strings like "100" via Jackson coercion and alias 'score'
    @JsonAlias({"score"})
    private int saldoMoedas;
}

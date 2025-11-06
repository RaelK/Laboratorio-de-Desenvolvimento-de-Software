package controller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TransacaoCreateDTO {
    private Long professorId;
    private Long alunoId;
    private int valor;
    private String descricao;
}

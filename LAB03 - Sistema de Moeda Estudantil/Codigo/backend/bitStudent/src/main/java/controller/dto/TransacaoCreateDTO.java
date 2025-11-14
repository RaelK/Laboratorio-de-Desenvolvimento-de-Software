package controller.dto;

import lombok.Data;

@Data
public class TransacaoCreateDTO {
    private Long idProfessor;
    private Long idAluno;
    private int valor;
    private String descricao;
}
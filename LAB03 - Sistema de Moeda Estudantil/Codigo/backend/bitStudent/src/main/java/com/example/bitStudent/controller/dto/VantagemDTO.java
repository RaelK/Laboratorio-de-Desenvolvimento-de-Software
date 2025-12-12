package com.example.bitStudent.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO de retorno de vantagem para o frontend.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VantagemDTO {

    private Long id;
    private String nome;
    private String descricao;
    private String categoria;
    private int custoEmMoedas;
    private String codigoVoucher;
    private Integer limitePorAluno;
    private Integer limiteMensal;
    private boolean exigeAprovacaoProfessor;
    private String foto;

    private Long empresaParceiraId;
    private String empresaParceiraNome;
}


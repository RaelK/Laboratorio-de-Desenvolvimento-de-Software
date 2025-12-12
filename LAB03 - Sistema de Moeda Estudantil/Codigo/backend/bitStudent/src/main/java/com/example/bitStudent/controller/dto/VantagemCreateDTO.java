package com.example.bitStudent.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO usado para criar/atualizar vantagens.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VantagemCreateDTO {

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
}


package com.example.bitStudent.controller.dto;

import com.example.bitStudent.model.Resgate;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResgateResponseDTO {

    private Long id;
    private String codigoCupom;
    private String status;
    private String vantagem;
    private String empresa;

    public ResgateResponseDTO(Resgate r) {
        this.id = r.getId();
        this.codigoCupom = r.getCodigoCupom();
        this.status = r.getStatus().name();
        this.vantagem = r.getVantagem().getNome();
        this.empresa = r.getVantagem().getEmpresaParceira().getNome();
    }
}
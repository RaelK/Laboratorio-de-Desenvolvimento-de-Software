package com.example.bitStudent.controller;

import com.example.bitStudent.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class EmailTestController {

    private final EmailService emailService;

    @GetMapping("/email-teste")
    public String enviarTeste() {
        try {
            emailService.enviarCupomTicket(
                "seuemail@gmail.com",       // destinatário
                "Aluno Teste",              // nome do aluno
                "Vantagem de Teste",        // nome vantagem
                "",                         // imagem (opcional)
                "TESTE1234",                // código cupom
                "Empresa Fake"              // nome da empresa parceira
            );

            return "E-mail de teste enviado!";
        } catch (Exception e) {
            return "Erro ao enviar: " + e.getMessage();
        }
    }
}
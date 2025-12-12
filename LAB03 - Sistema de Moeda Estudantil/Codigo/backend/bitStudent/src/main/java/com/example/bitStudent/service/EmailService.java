package com.example.bitStudent.service;

import com.example.bitStudent.model.Aluno;
import com.example.bitStudent.model.Professor;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import lombok.RequiredArgsConstructor;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    // ----------------------------------------------------------
    // 1) ENVIA O CUPOM PARA O ALUNO (TEMPLATE OFICIAL)
    // ----------------------------------------------------------
    public void enviarCupomTicket(
            String destinatario,
            String nomeAluno,
            String nomeVantagem,
            String urlImagemVantagem,
            String codigoCupom,
            String qrCodeBase64) {
        try {

            String assunto = "Seu Cupom BitStudent - " + nomeVantagem;

            // TEMPLATE HTML OFICIAL DO SISTEMA
            String corpo = """
                    <div style="font-family: Arial, sans-serif; max-width: 520px; margin:auto;
                        background:#0B132B; padding:24px; border-radius:14px; color:white;
                        border:2px solid #14b8a6;">

                        <h2 style="text-align:center; color:#14b8a6; margin-bottom:10px;">
                            🎁 Seu Cupom Está Pronto!
                        </h2>

                        <p>Olá <strong>%s</strong>,</p>

                        <p>Você resgatou a vantagem:</p>

                        <h3 style="text-align:center; font-size:22px; color:#4ade80; margin:10px 0;">
                            %s
                        </h3>

                        <img src="%s" alt="Vantagem"
                            style="width:150px; display:block; margin:18px auto; border-radius:8px;" />

                        <p style="text-align:center; margin-top:20px;">Apresente este QR Code no estabelecimento:</p>

                        <div style="text-align:center; margin:20px 0;">
                            <img src="data:image/png;base64,%s" width="200"
                                style="border:2px solid #14b8a6; border-radius:10px; padding:6px;" />
                        </div>

                        <div style="background:#1e293b; padding:12px; margin:20px 0;
                            border-radius:8px; text-align:center; border:1px dashed #4ade80;">
                            <span style="font-size:22px; font-weight:bold;">%s</span>
                        </div>

                        <p style="opacity:0.7;">
                            *Este cupom é exclusivo e intransferível. Identificação poderá ser solicitada.
                        </p>
                    </div>
                    """.formatted(
                    nomeAluno,
                    nomeVantagem,
                    urlImagemVantagem != null ? urlImagemVantagem : "",
                    qrCodeBase64,
                    codigoCupom);

            enviarEmailHTML(destinatario, assunto, corpo);

        } catch (Exception e) {
            System.out.println("Erro ao enviar cupom: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // ----------------------------------------------------------
    // 2) NOTIFICAR EMPRESA PARCEIRA SOBRE RESGATE (COM QR CODE)
    // ----------------------------------------------------------
    public void notificarProfessorResgate(
            String emailDestino,
            String nomeEmpresa,
            String nomeAluno,
            String nomeVantagem,
            String codigoCupom,
            String qrCodeBase64,
            int valorMoedas) {

        try {
            String assunto = "Novo Resgate - " + nomeVantagem;

            String corpo = """
                    <div style="font-family: Arial, sans-serif; max-width: 520px; margin:auto;
                        background:#0B132B; padding:24px; border-radius:14px; color:white;
                        border:2px solid #fbbf24;">

                        <h2 style="text-align:center; color:#fbbf24; margin-bottom:10px;">
                            Novo Resgate Recebido 🏷️
                        </h2>

                        <p><strong>Parceiro:</strong> %s</p>
                        <p><strong>Aluno:</strong> %s</p>
                        <p><strong>Vantagem:</strong> %s</p>
                        <p><strong>Moedas Utilizadas:</strong> %d</p>

                        <div style="background:#1e293b; padding:12px; margin:20px 0;
                            border-radius:8px; text-align:center; border:1px dashed #fbbf24;">
                            <span style="font-size:22px; font-weight:bold;">%s</span>
                        </div>

                        <p style="text-align:center; margin-top:10px;">QR Code para validação:</p>

                        <div style="text-align:center; margin:20px 0;">
                            <img src="data:image/png;base64,%s" width="200"
                                style="border:2px solid #fbbf24; border-radius:10px; padding:6px;" />
                        </div>

                        <p style="opacity:0.7; font-size:12px; margin-top:22px;">
                            Este e-mail foi gerado automaticamente pelo sistema BitStudent.
                            Apresente o código e o QR Code para validar o resgate.
                        </p>
                    </div>
                    """.formatted(
                    nomeEmpresa,
                    nomeAluno,
                    nomeVantagem,
                    valorMoedas,
                    codigoCupom,
                    qrCodeBase64);

            enviarEmailHTML(emailDestino, assunto, corpo);

        } catch (Exception e) {
            System.out.println("Erro ao notificar parceiro: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // ----------------------------------------------------------
    // 3) NOTIFICAR ALUNO SOBRE RECEBIMENTO DE MOEDAS
    // ----------------------------------------------------------
    public void notificarRecebimentoMoedas(
            Aluno aluno,
            Professor professor,
            int valor,
            String descricao) {
        try {
            String assunto = "Você recebeu moedas do professor " + professor.getNome();

            String corpo = """
                    <div style="font-family: Arial; padding: 16px;">
                        <h2 style="color: #28A745;">Você recebeu novas moedas!</h2>

                        <p><strong>Professor:</strong> %s</p>
                        <p><strong>Aluno:</strong> %s</p>
                        <p><strong>Quantidade:</strong> %d moedas</p>
                        <p><strong>Motivo:</strong> %s</p>

                        <p style="margin-top: 10px; font-size: 12px; color: #555;">
                            Continue participando e acumulando recompensas.
                        </p>
                    </div>
                    """.formatted(
                    professor.getNome(),
                    aluno.getNome(),
                    valor,
                    descricao);

            enviarEmailHTML(aluno.getEmail(), assunto, corpo);

        } catch (Exception e) {
            System.out.println("Erro ao notificar aluno: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // ----------------------------------------------------------
    // MÉTODO CENTRAL PARA ENVIAR HTML
    // ----------------------------------------------------------
    private void enviarEmailHTML(String destinatario, String assunto, String corpoHtml)
            throws MessagingException {

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setTo(destinatario);
        helper.setSubject(assunto);
        helper.setText(corpoHtml, true);

        mailSender.send(message);

        System.out.println("E-mail enviado para: " + destinatario);
    }
}
package service;

import org.springframework.stereotype.Service;



@Service
public class EmailService {

    private final GmailApiMailSender gmailSender;

    public EmailService(GmailApiMailSender gmailSender) {
        this.gmailSender = gmailSender;
    }

    public void enviarEmail(String destinatario, String assunto, String corpo) {
        try {
            gmailSender.enviar(destinatario, assunto, corpo);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao enviar email", e);
        }
    }
}
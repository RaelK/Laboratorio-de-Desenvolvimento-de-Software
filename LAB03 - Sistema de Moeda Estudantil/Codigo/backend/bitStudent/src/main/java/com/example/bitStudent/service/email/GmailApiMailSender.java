package com.example.bitStudent.service.email;

import com.google.api.services.gmail.Gmail;
import com.google.api.services.gmail.model.Message;

import jakarta.mail.Session;
import jakarta.mail.internet.MimeMessage;

import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Properties;

@Service
public class GmailApiMailSender {

    private final Gmail gmail;

    public GmailApiMailSender(GmailCredentialService credentialService) throws Exception {
        this.gmail = new Gmail.Builder(
                credentialService.getCredential().getTransport(),
                credentialService.getCredential().getJsonFactory(),
                credentialService.getCredential()
        )
        .setApplicationName("bitStudent")
        .build();
    }

    public void enviar(String destinatario, String assunto, String corpo) throws Exception {

        MimeMessage email = new MimeMessage(Session.getInstance(new Properties()));
        email.setFrom("noreplybitstudent@gmail.com");
        email.setRecipients(jakarta.mail.Message.RecipientType.TO, destinatario);
        email.setSubject(assunto, StandardCharsets.UTF_8.name());
        email.setText(corpo, StandardCharsets.UTF_8.name());

        ByteArrayOutputStream buffer = new ByteArrayOutputStream();
        email.writeTo(buffer);

        Message message = new Message();
        message.setRaw(Base64.getUrlEncoder().withoutPadding().encodeToString(buffer.toByteArray()));

        gmail.users().messages().send("me", message).execute();
        System.out.println("📧 Email enviado com sucesso via Gmail API!");
    }
}
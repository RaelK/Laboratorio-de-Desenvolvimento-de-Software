package service;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.util.Base64;
import com.google.api.services.gmail.Gmail;
import com.google.api.services.gmail.model.Message;
import jakarta.mail.Session;
import jakarta.mail.internet.MimeMessage;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.Properties;

@Service
public class GmailApiMailSender {

    private final Gmail gmail;

    public GmailApiMailSender(Credential credential) {
        gmail = new Gmail.Builder(
                credential.getTransport(),
                credential.getJsonFactory(),
                credential
        ).setApplicationName("bitStudent").build();
    }

    public void enviar(String destinatario, String assunto, String corpo) throws Exception {

        Properties props = new Properties();
        Session session = Session.getInstance(props);

        MimeMessage email = new MimeMessage(session);
        email.setFrom("noreplybitstudent@gmail.com");
        email.setRecipients(jakarta.mail.Message.RecipientType.TO, destinatario);
        email.setSubject(assunto, "UTF-8");
        email.setText(corpo, "UTF-8");

        ByteArrayOutputStream buffer = new ByteArrayOutputStream();
        email.writeTo(buffer);
        byte[] bytes = buffer.toByteArray();

        String encodedEmail = Base64.encodeBase64URLSafeString(bytes);
        Message message = new Message();
        message.setRaw(encodedEmail);

        gmail.users().messages().send("me", message).execute();

        System.out.println("📨 Enviado com sucesso via Gmail API!");
    }
}

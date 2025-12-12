package com.example.bitStudent.service.email;

import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.Response;
import com.sendgrid.SendGrid;

import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@Profile("render")
public class SendGridEmailService {

    @Value("${sendgrid.api.key}")
    private String apiKey;

    @Value("${sendgrid.from.email}")
    private String fromEmail;

    public void enviarEmailHTML(String destinatario, String assunto, String corpoHtml) {

        Email from = new Email(fromEmail);
        Email to = new Email(destinatario);
        Content content = new Content("text/html", corpoHtml);

        Mail mail = new Mail(from, assunto, to, content);

        SendGrid sg = new SendGrid(apiKey);
        Request request = new Request();

        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());

            Response response = sg.api(request);
            System.out.println("📧 SendGrid status: " + response.getStatusCode());

        } catch (IOException ex) {
            System.out.println("❌ Erro ao enviar email via SendGrid");
            ex.printStackTrace();
        }
    }
}
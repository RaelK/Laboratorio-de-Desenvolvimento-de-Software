package config;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.util.store.FileDataStoreFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Collections;

@Configuration
public class GmailOAuth2Config {

    @Value("${gmail.credentials.path}")
    private String credentialsPath;

    private static final JacksonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();

    /**
     * Método que faz todo o fluxo OAuth2 e devolve o Credential.
     */
    public Credential getCredentials() throws Exception {

        InputStream in = getClass().getClassLoader().getResourceAsStream(credentialsPath);

        if (in == null) {
            throw new RuntimeException("Arquivo credentials.json não encontrado: " + credentialsPath);
        }

        GoogleClientSecrets clientSecrets =
                GoogleClientSecrets.load(JSON_FACTORY, new InputStreamReader(in));

        GoogleAuthorizationCodeFlow flow =
                new GoogleAuthorizationCodeFlow.Builder(
                        GoogleNetHttpTransport.newTrustedTransport(),
                        JSON_FACTORY,
                        clientSecrets,
                        // escopo correto para acesso total ao Gmail (inclui envio)
                        Collections.singletonList("https://mail.google.com/")
                )
                .setDataStoreFactory(new FileDataStoreFactory(new java.io.File("tokens")))
                .setAccessType("offline")
                .build();

        LocalServerReceiver receiver =
                new LocalServerReceiver.Builder().setPort(8888).build();

        return new com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp(
                flow,
                receiver
        ).authorize("user");
    }

    @Bean
    public Credential gmailCredential() throws Exception {
        return getCredentials();
    }
}

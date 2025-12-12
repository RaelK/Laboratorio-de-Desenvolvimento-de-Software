package com.example.bitStudent.service.email;

import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.util.store.FileDataStoreFactory;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.file.Path;
import java.util.Collections;

@Configuration
public class GmailOAuth2Config {

    private static final GsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();

    @Bean
    public GoogleAuthorizationCodeFlow googleFlow() throws Exception {

        InputStream in = getClass().getClassLoader()
                .getResourceAsStream("gmail/credentials.json");

        if (in == null) {
            throw new RuntimeException("credentials.json não encontrado em src/main/resources/gmail/");
        }

        GoogleClientSecrets clientSecrets =
                GoogleClientSecrets.load(JSON_FACTORY, new InputStreamReader(in));

        Path tokenPath = Path.of(System.getProperty("user.home"), ".bitstudent-oauth-tokens");
        FileDataStoreFactory dataStore = new FileDataStoreFactory(tokenPath.toFile());

        return new GoogleAuthorizationCodeFlow.Builder(
                GoogleNetHttpTransport.newTrustedTransport(),
                JSON_FACTORY,
                clientSecrets,
                Collections.singletonList("https://mail.google.com/")
        )
        .setAccessType("offline")
        .setDataStoreFactory(dataStore)
        .setApprovalPrompt("force")
        .build();
    }
}
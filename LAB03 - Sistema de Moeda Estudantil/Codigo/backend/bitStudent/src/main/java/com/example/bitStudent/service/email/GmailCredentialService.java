package com.example.bitStudent.service.email;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;

import org.springframework.stereotype.Service;

@Service
public class GmailCredentialService {

    private final GoogleAuthorizationCodeFlow flow;

    public GmailCredentialService(GoogleAuthorizationCodeFlow flow) {
        this.flow = flow;
    }

    public Credential getCredential() throws Exception {
        LocalServerReceiver receiver = new LocalServerReceiver.Builder()
                .setPort(8888)
                .build();

        return new AuthorizationCodeInstalledApp(flow, receiver)
                .authorize("user");
    }
}
package com.example.bitStudent.controller.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequestDTO {
    private String login;
    private String senha;
}
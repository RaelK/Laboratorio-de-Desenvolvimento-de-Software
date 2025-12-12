Write-Host "`n🔧 Corrigindo pacotes do projeto...`n"

$files = Get-ChildItem -Path "src/main/java" -Recurse -Filter *.java

foreach ($file in $files) {

    $content = Get-Content $file.FullName -Raw

    $content = $content.Replace("package model;", "package com.example.bitStudent.model;")
    $content = $content.Replace("package repository;", "package com.example.bitStudent.repository;")
    $content = $content.Replace("package controller;", "package com.example.bitStudent.controller;")
    $content = $content.Replace("package service;", "package com.example.bitStudent.service;")
    $content = $content.Replace("package exception;", "package com.example.bitStudent.exception;")
    $content = $content.Replace("package config;", "package com.example.bitStudent.config;")

    $content = $content.Replace("import model.", "import com.example.bitStudent.model.")
    $content = $content.Replace("import repository.", "import com.example.bitStudent.repository.")
    $content = $content.Replace("import controller.", "import com.example.bitStudent.controller.")
    $content = $content.Replace("import service.", "import com.example.bitStudent.service.")
    $content = $content.Replace("import exception.", "import com.example.bitStudent.exception.")
    $content = $content.Replace("import config.", "import com.example.bitStudent.config.")

    Set-Content -Path $file.FullName -Value $content -Encoding UTF8

    Write-Host ("✔ Atualizado: " + $file.Name)
}

Write-Host "`n🎯 Finalizado com sucesso! Pacotes corrigidos!`n"

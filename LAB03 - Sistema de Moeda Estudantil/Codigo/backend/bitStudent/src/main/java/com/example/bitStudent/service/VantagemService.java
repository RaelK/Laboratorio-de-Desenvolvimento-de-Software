package com.example.bitStudent.service;

import com.example.bitStudent.model.EmpresaParceira;
import com.example.bitStudent.model.Vantagem;
import com.example.bitStudent.repository.VantagemRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VantagemService {

    private final VantagemRepository repository;

    // -------------------------------------------------------
    // 1) CRIAÇÃO VIA JSON — usado pelo frontend
    // -------------------------------------------------------
    public Vantagem criarViaJson(Vantagem vantagem, EmpresaParceira empresa) {

        vantagem.setId(null); // garante novo registro
        vantagem.setEmpresaParceira(empresa);

        // Foto pode ser Base64 ou URL. Apenas aceita.
        if (vantagem.getFoto() != null) {
            vantagem.setFoto(vantagem.getFoto());
        }

        return repository.save(vantagem);
    }

    // -------------------------------------------------------
    // 2) CRIAÇÃO VIA MULTIPART (UPLOAD REAL)
    // -------------------------------------------------------
    public Vantagem criar(Vantagem v, EmpresaParceira empresa, MultipartFile foto) {

        v.setId(null); // evita erro de PK duplicada
        v.setEmpresaParceira(empresa);

        if (foto != null && !foto.isEmpty()) {
            try {
                String base64 = Base64.getEncoder().encodeToString(foto.getBytes());
                v.setFoto("data:image/png;base64," + base64);
            } catch (IOException e) {
                throw new RuntimeException("Erro ao processar imagem.");
            }
        }

        return repository.save(v);
    }

    // --------------------------------------------------------
    // LISTAR, BUSCAR, ATUALIZAR, DELETAR
    // --------------------------------------------------------
    public List<Vantagem> listar() {
        return repository.findAll();
    }

    public Vantagem buscar(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vantagem não encontrada"));
    }

    public Vantagem atualizar(Long id, Vantagem dados) {

        Vantagem v = buscar(id);

        v.setNome(dados.getNome());
        v.setDescricao(dados.getDescricao());
        v.setCustoEmMoedas(dados.getCustoEmMoedas());
        v.setFoto(dados.getFoto());
        v.setCategoria(dados.getCategoria());
        v.setLimiteMensal(dados.getLimiteMensal());
        v.setLimitePorAluno(dados.getLimitePorAluno());
        v.setExigeAprovacaoProfessor(dados.getExigeAprovacaoProfessor());

        return repository.save(v);
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }
}
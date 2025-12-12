package com.example.bitStudent.service;

import com.example.bitStudent.controller.dto.TransacaoCreateDTO;
import com.example.bitStudent.model.Aluno;
import com.example.bitStudent.model.Professor;
import com.example.bitStudent.model.Transacao;
import com.example.bitStudent.model.enums.TipoTransacao;
import com.example.bitStudent.repository.AlunoRepository;
import com.example.bitStudent.repository.ProfessorRepository;
import com.example.bitStudent.repository.TransacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TransacaoService {

    @Autowired
    private TransacaoRepository transacaoRepository;

    @Autowired
    private ProfessorRepository professorRepository;

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private EmailService emailService;

    // ---------------------------------------------------------
    // SALVAR (OBRIGATÓRIO PORQUE É USADO NO ResgateService)
    // ---------------------------------------------------------
    public Transacao salvar(Transacao transacao) {
        return transacaoRepository.save(transacao);
    }

    // ---------------------------------------------------------
    // LISTAGENS
    // ---------------------------------------------------------
    public List<Transacao> listarTodas() {
        return transacaoRepository.findAll();
    }

    public List<Transacao> listarTransacoesPorAluno(Long alunoId) {
        return transacaoRepository.findByAlunoId(alunoId);
    }

    public List<Transacao> listarTransacoesPorProfessor(Long professorId) {
        return transacaoRepository.findByProfessorId(professorId);
    }

    // ---------------------------------------------------------
    // ENVIO DE MOEDAS (PROFESSOR → ALUNO)
    // ---------------------------------------------------------
    public Transacao enviarMoedas(TransacaoCreateDTO dto) {

        Optional<Professor> professorOpt = professorRepository.findById(dto.getIdProfessor());
        Optional<Aluno> alunoOpt = alunoRepository.findById(dto.getIdAluno());

        if (professorOpt.isEmpty()) {
            throw new RuntimeException("Professor não encontrado.");
        }
        if (alunoOpt.isEmpty()) {
            throw new RuntimeException("Aluno não encontrado.");
        }

        Professor professor = professorOpt.get();
        Aluno aluno = alunoOpt.get();
        int valor = dto.getValor();

        // validar saldo
        if (professor.getSaldoMoedas() < valor) {
            throw new RuntimeException("Saldo insuficiente do professor.");
        }

        // debitar e creditar
        professor.setSaldoMoedas(professor.getSaldoMoedas() - valor);
        aluno.setSaldoMoedas(aluno.getSaldoMoedas() + valor);

        professorRepository.save(professor);
        alunoRepository.save(aluno);

        // registrar transação
        Transacao transacao = new Transacao();
        transacao.setAluno(aluno);
        transacao.setProfessor(professor);
        transacao.setValor(valor);
        transacao.setDescricao(dto.getDescricao());
        transacao.setTipo(TipoTransacao.ENVIO);
        transacao.setData(LocalDateTime.now());

        Transacao saved = transacaoRepository.save(transacao);

        // envio de email
        emailService.notificarRecebimentoMoedas(aluno, professor, valor, dto.getDescricao());

        return saved;
    }
}
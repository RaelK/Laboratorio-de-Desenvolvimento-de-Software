package service;

import model.Aluno;
import model.Professor;
import model.Transacao;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import repository.AlunoRepository;
import repository.ProfessorRepository;
import repository.TransacaoRepository;

import java.util.Date;

@Service
public class TransacaoService {

    private final TransacaoRepository transacaoRepository;
    private final ProfessorRepository professorRepository;
    private final AlunoRepository alunoRepository;

    public TransacaoService(TransacaoRepository transacaoRepository, ProfessorRepository professorRepository, AlunoRepository alunoRepository) {
        this.transacaoRepository = transacaoRepository;
        this.professorRepository = professorRepository;
        this.alunoRepository = alunoRepository;
    }

    @Transactional
    public Transacao transferirDeProfessorParaAluno(Long professorId, Long alunoId, int valor, String descricao) {
        Professor p = professorRepository.findById(professorId).orElseThrow(() -> new ResourceNotFoundException("Professor não encontrado: " + professorId));
        Aluno a = alunoRepository.findById(alunoId).orElseThrow(() -> new ResourceNotFoundException("Aluno não encontrado: " + alunoId));

        if (p.getSaldoMoedas() < valor) {
            throw new IllegalArgumentException("Saldo insuficiente do professor");
        }

        p.setSaldoMoedas(p.getSaldoMoedas() - valor);
        a.setSaldoMoedas(a.getSaldoMoedas() + valor);

        professorRepository.save(p);
        alunoRepository.save(a);

        Transacao t = Transacao.builder()
                .data(new Date())
                .valor(valor)
                .descricao(descricao)
                .professor(p)
                .aluno(a)
                .build();

        return transacaoRepository.save(t);
    }
}

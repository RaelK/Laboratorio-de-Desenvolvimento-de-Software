package service;

import jakarta.transaction.Transactional;
import model.Aluno;
import model.Professor;
import model.Transacao;
import org.springframework.stereotype.Service;
import repository.AlunoRepository;
import repository.ProfessorRepository;
import repository.TransacaoRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TransacaoService {

    private final TransacaoRepository transacaoRepository;
    private final ProfessorRepository professorRepository;
    private final AlunoRepository alunoRepository;
    private final EmailService emailService;

    public TransacaoService(
            TransacaoRepository transacaoRepository,
            ProfessorRepository professorRepository,
            AlunoRepository alunoRepository,
            EmailService emailService
    ) {
        this.transacaoRepository = transacaoRepository;
        this.professorRepository = professorRepository;
        this.alunoRepository = alunoRepository;
        this.emailService = emailService;
    }

    /** 🔹 Envia moedas do professor para um aluno e dispara e-mails */
    @Transactional
    public Transacao transferirDeProfessorParaAluno(
            Long professorId, Long alunoId, int valor, String descricao
    ) {

        Professor p = professorRepository.findById(professorId)
                .orElseThrow(() -> new RuntimeException("Professor não encontrado: " + professorId));

        Aluno a = alunoRepository.findById(alunoId)
                .orElseThrow(() -> new RuntimeException("Aluno não encontrado: " + alunoId));

        // ============================================================
        // ⭐ CORREÇÃO PRINCIPAL: saldo inicial recalculado corretamente
        // ============================================================

        int totalPermitido = (p.getAlunos() != null && !p.getAlunos().isEmpty())
                ? p.getAlunos().size() * Professor.MOEDAS_POR_ALUNO_POR_SEMESTRE
                : Professor.MOEDAS_POR_ALUNO_POR_SEMESTRE;

        // Antes só recarregava quando saldo == 0, agora corrige qualquer valor inválido
        if (p.getSaldoMoedas() <= 0) {
            p.setSaldoMoedas(totalPermitido);
        }

        // ============================================================
        // ⭐ Validação correta: qualquer valor é permitido, exceto > saldo
        // ============================================================

        if (valor <= 0) {
            throw new IllegalArgumentException("O valor deve ser maior que zero.");
        }

        if (p.getSaldoMoedas() < valor) {
            throw new IllegalArgumentException("Saldo insuficiente do professor");
        }

        // Atualiza saldos
        p.setSaldoMoedas(p.getSaldoMoedas() - valor);
        a.setSaldoMoedas(a.getSaldoMoedas() + valor);

        professorRepository.save(p);
        alunoRepository.save(a);

        // Criação da transação
        Transacao t = Transacao.builder()
                .data(LocalDateTime.now())
                .valor(valor)
                .descricao(descricao)
                .professor(p)
                .aluno(a)
                .build();

        Transacao salva = transacaoRepository.save(t);

        // ============================================================
        // ⭐ Envio de e-mails (mantido como no original)
        // ============================================================

        try {
            String assuntoAluno = "🎓 Você recebeu moedas no sistema bitStudent!";
            String corpoAluno = String.format(
                    """
                    🪙 bitStudent

                    Olá %s,

                    Você recebeu **%d moedas** do professor **%s**.

                    📜 Motivo: %s
                    🕓 Data: %s
                    """,
                    a.getNome(), valor, p.getNome(), descricao, t.getData()
            );

            String assuntoProfessor = "💰 Confirmação de envio de moedas — bitStudent";
            String corpoProfessor = String.format(
                    """
                    🪙 bitStudent

                    Olá %s,

                    Você enviou **%d moedas** para o aluno **%s**.

                    💰 Saldo atual: %d moedas
                    🕓 Data: %s
                    """,
                    p.getNome(), valor, a.getNome(), p.getSaldoMoedas(), t.getData()
            );

            emailService.enviarEmail(a.getEmail(), assuntoAluno, corpoAluno);
            emailService.enviarEmail(p.getEmail(), assuntoProfessor, corpoProfessor);
            emailService.enviarEmail(
                    "raelkiluanji@gmail.com",
                    "📋 Cópia de transação bitStudent",
                    String.format(
                            """
                            🪙 bitStudent — Cópia administrativa

                            Professor: %s
                            Aluno: %s
                            Valor: %d
                            Motivo: %s
                            Data: %s
                            """,
                            p.getNome(), a.getNome(), valor, descricao, t.getData()
                    )
            );

        } catch (Exception e) {
            System.err.println("⚠️ Falha ao enviar e-mails: " + e.getMessage());
        }

        return salva;
    }

    /** 🔹 Extrato do aluno */
    public List<Transacao> extratoAluno(Long alunoId) {
        return transacaoRepository.findByAlunoId(alunoId);
    }

    /** 🔹 Extrato do professor */
    public List<Transacao> extratoProfessor(Long professorId) {
        return transacaoRepository.findByProfessorId(professorId);
    }
}
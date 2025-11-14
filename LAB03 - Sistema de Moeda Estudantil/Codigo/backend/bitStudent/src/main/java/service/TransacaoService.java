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
    private final EmailService emailService; // ✅ integração com o Mailtrap

    public TransacaoService(
            TransacaoRepository transacaoRepository,
            ProfessorRepository professorRepository,
            AlunoRepository alunoRepository,
            EmailService emailService) {

        this.transacaoRepository = transacaoRepository;
        this.professorRepository = professorRepository;
        this.alunoRepository = alunoRepository;
        this.emailService = emailService;
    }

    /** 🔹 Envia moedas do professor para um aluno e dispara e-mails */
    @Transactional
    public Transacao transferirDeProfessorParaAluno(Long professorId, Long alunoId, int valor, String descricao) {
        Professor p = professorRepository.findById(professorId)
                .orElseThrow(() -> new RuntimeException("Professor não encontrado: " + professorId));
        Aluno a = alunoRepository.findById(alunoId)
                .orElseThrow(() -> new RuntimeException("Aluno não encontrado: " + alunoId));

        // Calcula total permitido por semestre
        int totalPermitido = (p.getAlunos() != null && !p.getAlunos().isEmpty())
                ? p.getAlunos().size() * Professor.MOEDAS_POR_ALUNO_POR_SEMESTRE
                : Professor.MOEDAS_POR_ALUNO_POR_SEMESTRE;

        if (p.getSaldoMoedas() == 0) {
            p.setSaldoMoedas(totalPermitido);
        }

        if (p.getSaldoMoedas() < valor) {
            throw new IllegalArgumentException("Saldo insuficiente do professor");
        }

        // Atualiza saldos
        p.setSaldoMoedas(p.getSaldoMoedas() - valor);
        a.setSaldoMoedas(a.getSaldoMoedas() + valor);

        professorRepository.save(p);
        alunoRepository.save(a);

        // Cria e salva a transação
        Transacao t = Transacao.builder()
                .data(LocalDateTime.now())
                .valor(valor)
                .descricao(descricao)
                .professor(p)
                .aluno(a)
                .build();

        Transacao salva = transacaoRepository.save(t);

        // ✅ Envio de e-mails automáticos
        try {
            String assuntoAluno = "🎓 Você recebeu moedas no sistema bitStudent!";
            String corpoAluno = String.format(
                    """
                    🪙 bitStudent

                    Olá %s,

                    Você recebeu **%d moedas** de reconhecimento do professor **%s**.

                    📜 Motivo: %s  
                    🕓 Data: %s

                    Acesse sua conta no sistema *bitStudent* para consultar seu extrato completo.

                    Atenciosamente,  
                    Equipe bitStudent
                    """,
                    a.getNome(), valor, p.getNome(), descricao, t.getData()
            );

            String assuntoProfessor = "💰 Confirmação de envio de moedas — bitStudent";
            String corpoProfessor = String.format(
                    """
                    🪙 bitStudent

                    Olá %s,

                    Você enviou **%d moedas** para o aluno **%s**.  
                    📜 Motivo: %s  
                    💰 Saldo atual: %d moedas  
                    🕓 Data: %s

                    Atenciosamente,  
                    Equipe bitStudent
                    """,
                    p.getNome(), valor, a.getNome(), descricao, p.getSaldoMoedas(), t.getData()
            );

            // Envia e-mails
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
            System.err.println("⚠️ Falha ao enviar e-mails de notificação: " + e.getMessage());
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
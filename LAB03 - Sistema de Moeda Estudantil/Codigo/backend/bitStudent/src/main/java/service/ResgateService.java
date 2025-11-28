package service;

import model.Aluno;
import model.Resgate;
import model.Vantagem;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import repository.AlunoRepository;
import repository.ResgateRepository;
import repository.VantagemRepository;

import java.util.Date;
import java.util.UUID;

@Service
public class ResgateService {

    private final ResgateRepository resgateRepository;
    private final VantagemRepository vantagemRepository;
    private final AlunoRepository alunoRepository;
    private final EmailService emailService;

    public ResgateService(ResgateRepository resgateRepository, VantagemRepository vantagemRepository, AlunoRepository alunoRepository, EmailService emailService) {
        this.resgateRepository = resgateRepository;
        this.vantagemRepository = vantagemRepository;
        this.alunoRepository = alunoRepository;
        this.emailService = emailService;
    }

    @Transactional
    public Resgate resgatar(Long alunoId, Long vantagemId) {
        Aluno a = alunoRepository.findById(alunoId).orElseThrow(() -> new ResourceNotFoundException("Aluno não encontrado: " + alunoId));
        Vantagem v = vantagemRepository.findById(vantagemId).orElseThrow(() -> new ResourceNotFoundException("Vantagem não encontrada: " + vantagemId));

        if (a.getSaldoMoedas() < v.getCustoEmMoedas()) {
            throw new IllegalArgumentException("Saldo insuficiente para resgate");
        }

        a.setSaldoMoedas(a.getSaldoMoedas() - v.getCustoEmMoedas());
        alunoRepository.save(a);

        Resgate r = Resgate.builder()
                .data(new Date())
                .codigoCupom(UUID.randomUUID().toString())
                .aluno(a)
                .vantagem(v)
                .empresaParceira(v.getEmpresaParceira())
                .build();

        Resgate resgateSalvo = resgateRepository.save(r);

        // ✅ Envio de e-mail para o aluno sobre o resgate
        try {
            String assunto = "🎁 Resgate de vantagem realizado — bitStudent";
            String corpo = String.format(
                    """
                    🪙 bitStudent

                    Olá %s,

                    Você resgatou a vantagem: %s
                    💰 Moedas utilizadas: %d
                    🎟️ Código do cupom: %s
                    📅 Data do resgate: %s

                    Apresente este código na empresa parceira para utilizar sua vantagem.

                    Atenciosamente,  
                    Equipe bitStudent
                    """,
                    a.getNome(),
                    v.getDescricao(),
                    v.getCustoEmMoedas(),
                    resgateSalvo.getCodigoCupom(),
                    resgateSalvo.getData()
                    
            );

            emailService.enviarEmail(a.getEmail(), assunto, corpo);

        } catch (Exception e) {
            System.err.println("⚠️ Falha ao enviar e-mail de resgate: " + e.getMessage());
        }

        return resgateSalvo;
    }
}

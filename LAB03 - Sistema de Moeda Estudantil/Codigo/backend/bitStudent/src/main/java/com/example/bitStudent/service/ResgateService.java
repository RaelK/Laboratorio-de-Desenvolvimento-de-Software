package com.example.bitStudent.service;

import com.example.bitStudent.model.Aluno;
import com.example.bitStudent.model.Resgate;
import com.example.bitStudent.model.StatusResgate;
import com.example.bitStudent.model.Transacao;
import com.example.bitStudent.model.Vantagem;
import com.example.bitStudent.model.enums.TipoTransacao;
import com.example.bitStudent.repository.ResgateRepository;
import com.example.bitStudent.util.QRCodeGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ResgateService {

    private final ResgateRepository resgateRepository;
    private final AlunoService alunoService;
    private final VantagemService vantagemService;
    private final TransacaoService transacaoService;
    private final EmailService emailService;

    public Resgate resgatar(Long alunoId, Long vantagemId) {

        Aluno aluno = alunoService.buscarPorId(alunoId);
        Vantagem vantagem = vantagemService.buscar(vantagemId);

        // Verificar saldo
        if (aluno.getSaldoMoedas() < vantagem.getCustoEmMoedas()) {
            throw new RuntimeException("Saldo insuficiente para resgatar esta vantagem.");
        }

        // Debitar saldo
        aluno.setSaldoMoedas(aluno.getSaldoMoedas() - vantagem.getCustoEmMoedas());
        alunoService.salvar(aluno);

        // Criar código de cupom
        String codigoCupom = UUID.randomUUID().toString().substring(0, 8);

        // GERAR QR CODE BASE64
        String qrCodeBase64 = QRCodeGenerator.generateQRCodeBase64(codigoCupom);

        // Criar resgate
        Resgate resgate = Resgate.builder()
                .aluno(aluno)
                .vantagem(vantagem)
                .codigoCupom(codigoCupom)
                .qrCode(qrCodeBase64)
                .status(StatusResgate.PENDENTE)
                .data(LocalDateTime.now().toString())
                .build();

        Resgate salvo = resgateRepository.save(resgate);

        // Criar transação de resgate
        Transacao transacao = Transacao.builder()
                .aluno(aluno)
                .descricao("Resgate da vantagem: " + vantagem.getNome())
                .valor(vantagem.getCustoEmMoedas())
                .tipo(TipoTransacao.RESGATE)
                .data(LocalDateTime.now())
                .build();

        transacaoService.salvar(transacao);

        // Enviar email para aluno com QR CODE
        emailService.enviarCupomTicket(
                aluno.getEmail(),
                aluno.getNome(),
                vantagem.getNome(),
                vantagem.getFoto(),
                codigoCupom,
                qrCodeBase64
        );

        // Notificar empresa
        emailService.notificarProfessorResgate(
                vantagem.getEmpresaParceira().getEmail(),
                vantagem.getEmpresaParceira().getNome(),
                aluno.getNome(),
                vantagem.getNome(),
                codigoCupom,
                qrCodeBase64,
                vantagem.getCustoEmMoedas()
        );

        // Atualiza status
        salvo.setStatus(StatusResgate.ENVIADO);
        return resgateRepository.save(salvo);
    }

    public Resgate buscar(Long id) {
        return resgateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resgate não encontrado"));
    }

    public List<Resgate> listar() {
        return resgateRepository.findAll();
    }
}